//@ts-check
import {json, text} from 'd3-fetch';

import page from 'page'
import Store from 'baredux'

import Assistant from './components/Assistant.svelte';
import LoginByEmail from './components/LoginByEmail.svelte';
import BookmarkList from './components/BookmarkList.svelte';
import TextSearch from './components/TextSearch.svelte'
import SendRecommandation from './components/SendRecommendation.svelte'

import {LISTE_RESSOURCES_ROUTE} from '../shared/routes.js';
import getAllResources from './getAllResources.js';

import lunr from "lunr"
import stemmerSupport from 'lunr-languages/lunr.stemmer.support'
import lunrfr from 'lunr-languages/lunr.fr'

stemmerSupport(lunr)
lunrfr(lunr)


const isProduction = location.hostname === 'betagouv.github.io'
const SERVER_ORIGIN = isProduction ? 
    'https://app-20420772-6ed7-40ca-978c-f360edf8941c.cleverapps.io' :
    `http://localhost:4999`

console.log('API server origin:', SERVER_ORIGIN)

function findRelevantResources(allResources, filters){
    return allResources.filter(r => {
        return filters.étapes.has(r.etape) && 
            (Array.isArray(r.thematique) ? 
                r.thematique.some(t => filters.thématiques.has(t)) :
                filters.thématiques.has(r.thematique))
    })
}

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
        allResources: [],
        relevantResources: [],
    
        currentPerson: undefined,
        currentRessourceCollection: undefined
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
        toggleÉtapeFilter(state, étape){
            if(state.filters.étapes.has(étape))
                state.filters.étapes.delete(étape)
            else
                state.filters.étapes.add(étape)

            state.relevantResources = findRelevantResources(state.allResources, state.filters)
        },
        toggleThématiquesFilter(state, thématique){
            if(state.filters.thématiques.has(thématique))
                state.filters.thématiques.delete(thématique)
            else
                state.filters.thématiques.add(thématique)

            state.relevantResources = findRelevantResources(state.allResources, state.filters)
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
        const étapesOptions = new Set(resources.map(r => r.etape).sort())
        const thématiquesOptions = new Set( resources.map(r => r.thematique).flat().sort() )

        store.mutations.setÉtapes([...étapesOptions]);
        store.mutations.setThématiques([...thématiquesOptions]);

        store.mutations.setAllResources(resources); 
        store.mutations.setRelevantResources(findRelevantResources(resources, store.state.filters))
    });
}


page.base(location.origin.includes('betagouv.github.io') ? '/urbanvitaliz' : '')

console.log('page.base', page.base())

page('/login-by-email', () => {
    const loginByEmail = new LoginByEmail({
        target: svelteTarget,
        props: {}
    });

    loginByEmail.$on('email', event => {
        const email = event.detail;
        
        json(`${SERVER_ORIGIN}/login-by-email?email=${email}`, {method: 'POST'})
        // @ts-ignore
        .then(({person, ressourceCollection}) => {
            console.log('login succesful', person, ressourceCollection)
            
            store.mutations.setCurrentPerson(person);
            store.mutations.setCurrentRessourceCollection(ressourceCollection);
            
            if (ressourceCollection.ressources_ids.length >= 1) {
                page( makeBookmarkListURLFromRessourceCollection(ressourceCollection) );
            }
            else {
                page('/brouillon-produit');
            }
        
        })
        .catch(res => console.error('error fetch email', res))
    });

    replaceComponent(loginByEmail, () => {})
})

/**
 * Cette fonction prend en argument un objet de type RessourceCollection
 * genre {edit_capability: string (url), ressource_ids: string[]}
 */
function makeBookmarkListURLFromRessourceCollection(ressourceCollection) {
    const { edit_capability } = ressourceCollection;
    const editCapURL = new URL(edit_capability);
    return `${LISTE_RESSOURCES_ROUTE}?secret=${editCapURL.searchParams.get('secret')}`
}

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

page('/brouillon-produit', () => {

    function mapStateToProps(state){
        const {étapes, thématiques, filters, relevantResources} = state;

        return {
            étapes, 
            thématiques, 
            filters, 
            relevantResources, 
            étapeFilterChange: store.mutations.toggleÉtapeFilter, 
            thématiqueFilterChange: store.mutations.toggleThématiquesFilter,
            makeBookmarkResource: state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
                makeBookmarkResourceFromCap(state.currentRessourceCollection.edit_capability) :
                undefined,
            makeUnbookmarkResource: state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
                makeUnbookmarkResourceFromCap(state.currentRessourceCollection.edit_capability) :
                undefined,
            bookmarkedResourceIdSet: new Set(state.currentRessourceCollection && state.currentRessourceCollection.ressources_ids),
            urlSecret: state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
                makeBookmarkListURLFromRessourceCollection(state.currentRessourceCollection) :
                undefined,
        }
    }

    const assistantUI = new Assistant({
        target: document.querySelector('.svelte-main'),
        props: mapStateToProps(store.state)
    });

    initializeStateWithResources()

    replaceComponent(assistantUI, mapStateToProps);
});

page(LISTE_RESSOURCES_ROUTE, context => {
    const params = new URLSearchParams(context.querystring);
    const secret = params.get('secret');

    function mapStateToProps(state){
        return {  
            bookmarkedResources: state.allResources && state.currentRessourceCollection ?
                state.allResources.filter(r => state.currentRessourceCollection.ressources_ids.includes(r.id)) :
                undefined,
            makeUnbookmarkResource: state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
                makeUnbookmarkResourceFromCap(state.currentRessourceCollection.edit_capability) :
                undefined,
        }
    }

    const bookmarkList = new BookmarkList({
        target: svelteTarget,
        props: mapStateToProps(store.state)
    });

    replaceComponent(bookmarkList, mapStateToProps)


    json(`${SERVER_ORIGIN}${LISTE_RESSOURCES_ROUTE}?secret=${secret}`)
    .then((ressourceCollection) => {
        store.mutations.setCurrentRessourceCollection(ressourceCollection);
    });

    initializeStateWithResources();
});

page('/recherche-textuelle', context => {

    function mapStateToProps(state){
        // @ts-ignore
        const index = lunr(function () {
            this.field('content')
            this.field('phrase_catch')
            this.field('etape')
            this.field('thematique', {boost: 2})
            this.field('keywords', {boost: 5})
            this.ref('id')
          
            for(const ressource of store.state.allResources){
                this.add(ressource)
                console.log("ressouces", ressource)
            }
        })

        return {
            findRelevantRessources(text){
                const lunrResults = index.search(text.replaceAll(':', ''))

                console.log('lunrResults', lunrResults)

                return lunrResults.map(r => store.state.allResources.find(ressource => ressource.id === r.ref))
            }
        }
    }

    const textSearch = new TextSearch({
        target: svelteTarget,
        props: mapStateToProps(store.state)
    });

    replaceComponent(textSearch, mapStateToProps)

    initializeStateWithResources();
});

page('/envoi-recommandation', context => {
    function mapStateToProps(){}
    const sendRecommandation = new SendRecommandation({
        target: svelteTarget,
    });

    json(`${SERVER_ORIGIN}/person-emails`)
    .then((emails) => {
        console.log("emails :", emails)
    });
    
    replaceComponent(sendRecommandation, mapStateToProps)

    initializeStateWithResources();
})

page.start()