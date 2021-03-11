//@ts-check
import {json, text} from 'd3-fetch';

import page from 'page'

import Assistant from './Assistant.svelte';
import LoginByEmail from './components/LoginByEmail.svelte';
import BookmarkList from './components/BookmarkList.svelte';

import {LISTE_RESSOURCES_ROUTE} from '../shared/routes.js';
import getAllResources from './getAllResources.js';

const isProduction = location.hostname === 'betagouv.github.io'
const SERVER_ORIGIN = isProduction ? 
    'https://app-f92a129e-7c5e-4922-97ab-66be747554dd.cleverapps.io' :
    `http://localhost:4999`

console.log('API server origin:', SERVER_ORIGIN)

const svelteTarget = document.querySelector('.svelte-main')

let currentComponent;

function replaceComponent(newComponent){
    if(currentComponent)
        currentComponent.$destroy()
    
    currentComponent = newComponent
}

const state = {
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
}

page.base(location.origin.includes('betagouv.github.io') ? '/urbanvitaliz' : '')

console.log('page.base', page.base())

function findRelevantResources(allResources, filters){
    return allResources.filter(r => {
        return filters.étapes.has(r.attributes.etape) && 
            (Array.isArray(r.attributes.thematique) ? 
                r.attributes.thematique.some(t => filters.thématiques.has(t)) :
                filters.thématiques.has(r.attributes.thematique))
    })
}

function initializeStateWithResources(){
    return getAllResources()
    .then(resources => {
        const étapesOptions = new Set(resources.map(r => r.attributes.etape))
        const thématiquesOptions = new Set( resources.map(r => r.attributes.thematique).flat() )

        state.étapes = [...étapesOptions];
        state.thématiques = [...thématiquesOptions];

        state.allResources = resources; 
        state.relevantResources = findRelevantResources(resources, state.filters)
    });
}


page('/login-by-email', () => {
    const loginByEmail = new LoginByEmail({
        target: svelteTarget,
        props: {}
    });

    loginByEmail.$on('email', event => {
        const email = event.detail;
        
        json(`${SERVER_ORIGIN}/login-by-email?email=${email}`, {method: 'POST'})
        .then(({person, ressourceCollection}) => {
            console.log('login succesful', person, ressourceCollection)

            const {edit_capability} = ressourceCollection;
            const editCapURL = new URL(edit_capability);

            state.currentPerson = person;
            state.currentRessourceCollection = ressourceCollection;

            if(ressourceCollection.ressources_ids.length >= 1){
                page(`${LISTE_RESSOURCES_ROUTE}?secret=${editCapURL.searchParams.get('secret')}`)
            }
            else {
                page('/brouillon-produit');
            }

        })
        .catch(res => console.error('error fetch email', res))
    });

    replaceComponent(loginByEmail)
})

page('/brouillon-produit', ({path:route}) => {

    function étapeFilterChange(étape){
        if(state.filters.étapes.has(étape))
            state.filters.étapes.delete(étape)
        else
            state.filters.étapes.add(étape)

        state.relevantResources = findRelevantResources(state.allResources, state.filters)

        render()
    }

    function thématiqueFilterChange(thématique){
        if(state.filters.thématiques.has(thématique))
            state.filters.thématiques.delete(thématique)
        else
            state.filters.thématiques.add(thématique)

        state.relevantResources = findRelevantResources(state.allResources, state.filters)

        render()
    }

    function bookmarkResourceById(editCapabilityUrl){
        return function bookmarkResource(resourceId){
            return function bookmarkResource(){
                return text(editCapabilityUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: resourceId})
                })
            }
        }
    }
    
    function render(){
        assistantUI.$set({
            ...state, 
            étapeFilterChange, 
            thématiqueFilterChange,
            bookmarkResourceById: state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
                bookmarkResourceById(state.currentRessourceCollection.edit_capability) :
                undefined
        })
    }

    const assistantUI = new Assistant({
        target: document.querySelector('.svelte-main'),
        props: {
            ...state, 
            étapeFilterChange, 
            thématiqueFilterChange,
            bookmarkResourceById: state.currentRessourceCollection && state.currentRessourceCollection.edit_capability ?
                bookmarkResourceById(state.currentRessourceCollection.edit_capability) :
                undefined
        }
    });

    initializeStateWithResources()
    .then(render);

    replaceComponent(assistantUI);

});

page(LISTE_RESSOURCES_ROUTE, context => {
    const params = new URLSearchParams(context.querystring);
    const secret = params.get('secret');
   
    function makeBookmarkedResources(){ 
        console.log('almakeBookmarkedResourcesl :',state.allResources, state.currentRessourceCollection);
        return state.allResources && state.currentRessourceCollection ?
            state.allResources.filter(r => state.currentRessourceCollection.ressources_ids.includes(r.id)) :
            undefined;
    }

    const bookmarkList = new BookmarkList({
        target: svelteTarget,
        props: {  
            bookmarkedResources: makeBookmarkedResources()
        }
    });
    
    replaceComponent(bookmarkList)

    function render(){
        bookmarkList.$set({
            bookmarkedResources: makeBookmarkedResources() 
        })
    }

    const resourceCollectionReceivedP = json(`${SERVER_ORIGIN}${LISTE_RESSOURCES_ROUTE}?secret=${secret}`)
    .then((ressourceCollection) => {
        state.currentRessourceCollection = ressourceCollection;
    });

    const allResourcesReadyP = initializeStateWithResources();
    
    Promise.all([resourceCollectionReceivedP, allResourcesReadyP])
    .then(render);

    


});

page.start()