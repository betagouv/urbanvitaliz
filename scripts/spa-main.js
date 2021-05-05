//@ts-check
import {json, text} from 'd3-fetch';

import page from 'page'
import Store from 'baredux'

import ToutesLesRessources from './components/ToutesLesRessources.svelte';
import BookmarkList from './components/BookmarkList.svelte';
import RechercheRessource from './components/RechercheRessource.svelte';
import SendRecommandation from './components/SendRecommendation.svelte';
import Ressource from './components/Ressource.svelte';

import {LISTE_RESSOURCES_ROUTE} from '../shared/routes.js';
import {TOUTES_LES_RESSOURCES} from '../shared/routes.js';
import SERVER_ORIGIN from './serverOrigin.js';
import getAllResources from './getAllResources.js';
import baseUrl from './baseUrl.js';
import makeBookmarkListURLFromRessourceCollection from './makeBookmarkListURLFromRessourceCollection.js';
import makeListRessourceURLFromPerson from './makeListRessourceURLFromPerson.js';
import findRelevantResourcesFromFilters from './findRelevantResourcesFromFilters.js';

import lunr from "lunr"
import stemmerSupport from 'lunr-languages/lunr.stemmer.support'
import lunrfr from 'lunr-languages/lunr.fr'
import prepareLoginHeader from './prepareLoginHeader.js';


stemmerSupport(lunr)
lunrfr(lunr)

// @ts-ignore
const store = new Store({
    state: {
        // Listes de toutes les étapes et thématiques disponible
        étapes: [],
        thématiques: [],
        // Etapes et thématiques sélectionnées par l'utilisateur.rice
        filters: {
            étapes: new Set(),
            thématiques: new Set()
        },
        allResources: undefined,
        relevantResources: [],
    
        currentPerson: undefined,
        currentRessourceCollection: undefined,

        allPersons: []
    }, 
    mutations: {
        setÉtapes(state, étapes){
            state.étapes = étapes
        },
        setThématiques(state, thématiques){
            state.thématiques = thématiques
        },
        setRelevantResources(state, relevantResources){
            state.relevantResources = relevantResources
        },
        setAllResources(state, allResources){
            state.allResources = allResources
        },
        setCurrentPerson(state, currentPerson){
            state.currentPerson = currentPerson
        },
        setCurrentRessourceCollection(state, currentRessourceCollection){
            state.currentRessourceCollection = currentRessourceCollection
        },
        setAllPersons(state, allPersons){
            state.allPersons = allPersons;
        },
        toggleÉtapeFilter(state, étape){
            if(state.filters.étapes.has(étape))
                state.filters.étapes.delete(étape)
            else
                state.filters.étapes.add(étape)

            state.relevantResources = findRelevantResourcesFromFilters(state.allResources, state.filters)
        },
        toggleThématiquesFilter(state, thématique){
            if(state.filters.thématiques.has(thématique))
                state.filters.thématiques.delete(thématique)
            else
                state.filters.thématiques.add(thématique)

            state.relevantResources = findRelevantResourcesFromFilters(state.allResources, state.filters)
        },
        addResourceIdToCurrentRessourceCollection(state, resourceId){
            state.currentRessourceCollection.ressources_ids.push(resourceId)
        },
        removeResourceIdFromCurrentRessourceCollection(state, resourceId){
            state.currentRessourceCollection.ressources_ids = state.currentRessourceCollection.ressources_ids
            .filter( id => id !== resourceId)        
        }
    }
})

const svelteTarget = document.querySelector('.svelte-main')

let currentComponent;
let mapStateToProps;

function replaceComponent(newComponent, _mapStateToProps){
    if(!_mapStateToProps){
        throw new Error('Missing _mapStateToProps in replaceComponent')
    }

    if(currentComponent)
        currentComponent.$destroy()
    
    currentComponent = newComponent
    mapStateToProps = _mapStateToProps
}

function render(state){
    const props = mapStateToProps(state);
    currentComponent.$set(props)
}

store.subscribe(render)


function initializeStateWithResources(){
    return getAllResources()
    .then(resources => {
        const étapesOptions = new Set(resources.map(r => r.etape).flat().sort())
        const thématiquesOptions = new Set( resources.map(r => r.thematique).flat().sort() )

        store.mutations.setÉtapes([...étapesOptions]);
        store.mutations.setThématiques([...thématiquesOptions]);

        store.mutations.setAllResources(resources); 
        store.mutations.setRelevantResources(findRelevantResourcesFromFilters(resources, store.state.filters))
    });
}


page.base(baseUrl)

console.log('page.base', page.base())

const onLogin = ({person}) => {
    console.log('login succesful', person)

    page(makeListRessourceURLFromPerson(person));
}

const setPerson = prepareLoginHeader(onLogin);


page(`/person`,context => {
    const params = new URLSearchParams(context.querystring);
    const firstAccessCapability = params.get('secret');

    json(`${SERVER_ORIGIN}/first-access?secret=${firstAccessCapability}`)
    .then((personAndRessourceCollection) => {
        
        store.mutations.setCurrentPerson(personAndRessourceCollection.person);
        store.mutations.setCurrentRessourceCollection(personAndRessourceCollection.ressourceCollection);
        
        setPerson(personAndRessourceCollection.person)
        
        page(makeBookmarkListURLFromRessourceCollection(personAndRessourceCollection.ressourceCollection))
    })
})

function makeBookmarkResourceFromCap(editCapabilityUrl){
    return function makeBookmarkResource(resourceId){
        return function bookmarkResource(){
            store.mutations.addResourceIdToCurrentRessourceCollection(resourceId)

            return text(editCapabilityUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({add: resourceId})
            })
        }
    }
}

function makeUnbookmarkResourceFromCap(editCapabilityUrl){
    return resourceId => {
        return () => {
            store.mutations.removeResourceIdFromCurrentRessourceCollection(resourceId)

            return text(editCapabilityUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({delete: resourceId})
            })
        }
    }
}

page(TOUTES_LES_RESSOURCES, () => {

    function mapStateToProps(state){
        const {étapes, thématiques, allResources} = state;

        return {
            allEtapes: étapes, 
            allThématiques: thématiques, 
            allResources,
            makeBookmarkResource: state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
                makeBookmarkResourceFromCap(state.currentRessourceCollection.edit_capability) :
                undefined,
            makeUnbookmarkResource: state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
                makeUnbookmarkResourceFromCap(state.currentRessourceCollection.edit_capability) :
                undefined,
            bookmarkedResourceIdSet: new Set(state.currentRessourceCollection && state.currentRessourceCollection.ressources_ids),
            listeRessourceURL: state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
                makeBookmarkListURLFromRessourceCollection(state.currentRessourceCollection) :
                undefined,
        }
    }

    const ToutesLesRessourcesUI = new ToutesLesRessources({
        target: document.querySelector('.svelte-main'),
        props: mapStateToProps(store.state)
    });

    initializeStateWithResources()

    replaceComponent(ToutesLesRessourcesUI, mapStateToProps);
});

page(LISTE_RESSOURCES_ROUTE, context => {
    const params = new URLSearchParams(context.querystring);
    const secret = params.get('secret');

    function mapStateToProps(state){
        return {  
            bookmarkedResources: state.allResources && state.currentRessourceCollection ?
                state.allResources.filter(r => state.currentRessourceCollection.ressources_ids.includes(r.id)) :
                undefined,
            makeBookmarkResource: state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
                makeBookmarkResourceFromCap(state.currentRessourceCollection.edit_capability) :
                undefined,
            makeUnbookmarkResource: state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
                makeUnbookmarkResourceFromCap(state.currentRessourceCollection.edit_capability) :
                undefined,
            recommendations: state.allResources && state.currentRessourceCollection && state.currentRessourceCollection.recommendations?
                state.currentRessourceCollection.recommendations.map(
                    ({ressourceId, message}) => ({resource: state.allResources.find(r => r.id === ressourceId), message})
                ) : 
                undefined
        }
    }

    const bookmarkList = new BookmarkList({
        target: svelteTarget,
        props: mapStateToProps(store.state)
    });

    replaceComponent(bookmarkList, mapStateToProps)


    json(`${SERVER_ORIGIN}${LISTE_RESSOURCES_ROUTE}?secret=${secret}`)
    .then((ressourceCollection) => {
         // @ts-ignore
         if(ressourceCollection.ressources_ids.length === 0 && !ressourceCollection.recommendations){
            page(TOUTES_LES_RESSOURCES);
        }
        store.mutations.setCurrentRessourceCollection(ressourceCollection);
    });

    initializeStateWithResources();
});

// This processing is a workaround to a limitation of lunr-languages
// https://github.com/MihaiValentin/lunr-languages/issues/71
function makeIndexableRessource(ressource){
    const {content, phrase_catch, etape, thematique, keywords, id} = ressource;

    return {
        content: removeAccents(content), 
        phrase_catch: removeAccents(phrase_catch), 
        etape: removeAccents(etape), 
        thematique: removeAccents( Array.isArray(thematique) ? thematique.join(', ') : thematique ), 
        keywords: removeAccents(keywords), 
        id
    }
}

function removeAccents(str){
    return typeof str === 'string' ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : undefined;
}

page('/recherche-ressource', context => {

    function mapStateToProps(state){
        const {étapes, thématiques, filters, relevantResources, allResources} = state;
        console.log("allResources:", allResources)
        let findRelevantRessources;
        
        // @ts-ignore
        if(state.allResources){
            const index = lunr(function () {
                this.field('content')
                this.field('phrase_catch')
                this.field('etape')
                this.field('thematique', {boost: 2})
                this.field('keywords', {boost: 5})
                this.ref('id')
        
                for(const ressource of state.allResources){
                    this.add( makeIndexableRessource(ressource) )
                }
            })

            findRelevantRessources = function(text){
                const lunrResults = index.search( removeAccents(text.replaceAll(':', '')) )
                
                let baseRessources = relevantResources

                if(filters.étapes.size === 0 && filters.thématiques.size === 0)
                    baseRessources = allResources

                return lunrResults.map(r => baseRessources.find(ressource => ressource.id === r.ref)).filter(r => r !== undefined)
            };
        } 

        return {
            étapes, 
            thématiques,
            allResources,
            filters, 
            étapeFilterChange: store.mutations.toggleÉtapeFilter, 
            thématiqueFilterChange: store.mutations.toggleThématiquesFilter,
            findRelevantRessources,
            makeBookmarkResource: state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
                makeBookmarkResourceFromCap(state.currentRessourceCollection.edit_capability) :
                undefined,
            makeUnbookmarkResource: state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
                makeUnbookmarkResourceFromCap(state.currentRessourceCollection.edit_capability) :
                undefined,
            bookmarkedResourceIdSet: new Set(state.currentRessourceCollection && state.currentRessourceCollection.ressources_ids),
            listeRessourceURL: state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
                makeBookmarkListURLFromRessourceCollection(state.currentRessourceCollection) :
                undefined,
        }
    }

    const textSearch = new RechercheRessource({
        target: svelteTarget,
        props: mapStateToProps(store.state)
    });

    replaceComponent(textSearch, mapStateToProps)

    initializeStateWithResources();
});

page('/envoi-recommandation', context => {
    
    function mapStateToProps(state){
        return {
            persons: state.allPersons,
            ressources: state.allResources,
            sendRecommandation(person, ressource, message){
                console.log('sendRecommandation', person, ressource, message)
                return text(`${SERVER_ORIGIN}/recommend`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({personId: person._id, ressourceId: ressource.id, message})
                })
            }
        }
    }

    const sendRecommandation = new SendRecommandation({
        target: svelteTarget,
        props: mapStateToProps(store.state)
    });

    json(`${SERVER_ORIGIN}/persons`)
    .then((data) => { 
        const persons = /** @type {import('../server/types').API_persons} */ (data);
        
        store.mutations.setAllPersons(persons) });
    
    replaceComponent(sendRecommandation, mapStateToProps)

    initializeStateWithResources();
})

page('/ressources/*', context => {
    function mapStateToProps(state){
        console.log(state.allResources)
        const ressource = state.allResources ? state.allResources.find(r => r.url === context.pathname || r.url === context.pathname + '.html'): {};
        
        const makeBookmarkResource =  state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
            makeBookmarkResourceFromCap(state.currentRessourceCollection.edit_capability) :
            undefined;        
        const bookmarkedResourceIdSet =  new Set(state.currentRessourceCollection && state.currentRessourceCollection.ressources_ids);

        const makeUnbookmarkResource = state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
            makeUnbookmarkResourceFromCap(state.currentRessourceCollection.edit_capability) :
            undefined;


        return {
            ressource,
            bookmarkResource: makeBookmarkResource && !bookmarkedResourceIdSet.has(ressource.id) && makeBookmarkResource(ressource.id),
            unbookmarkResource: makeUnbookmarkResource && bookmarkedResourceIdSet.has(ressource.id) && makeUnbookmarkResource(ressource.id),
            listeRessourceURL: state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
                makeBookmarkListURLFromRessourceCollection(state.currentRessourceCollection) :
                undefined,
        };
    }

    const ressource = new Ressource({
        target: svelteTarget,
        props: mapStateToProps(store.state)
    });

    replaceComponent(ressource, mapStateToProps)

    initializeStateWithResources();
})

page.start()
