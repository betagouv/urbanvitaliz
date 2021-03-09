//@ts-check
import {json} from 'd3-fetch';
import { Octokit } from '@octokit/rest';

import frontmatter from 'front-matter';
import page from 'page'

import Assistant from './Assistant.svelte';
import LoginByEmail from './components/LoginByEmail.svelte';

const Buffer = buffer.Buffer;
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
    currentEmail: undefined
}

page.base(location.origin.includes('betagouv.github.io') ? '/urbanvitaliz' : '')

console.log('page.base', page.base())

page('/login-by-email', context => {
    console.log(context);
    const loginByEmail = new LoginByEmail({
        target: svelteTarget,
        props: {}
    });

    loginByEmail.$on('email', event => {
        const email = event.detail;
        
        json(`${SERVER_ORIGIN}/login-by-email?email=${email}`, {method: 'POST'})
        .then(({person, ressourceCollection}) => {
            console.log('login succesful', person, ressourceCollection)

            if(ressourceCollection.ressources_ids.length >= 1){
                page('/liste-ressources?secret=47');
            }else {
                page('/brouillon-produit');
            }

            // const url = new URL(collectionFricheCap);
            // page(`${COLLECTION_FRICHE_UI_PATH}?secret=${url.searchParams.get('secret')}`)
        })
        .catch(res => console.error('error fetch email', res))
    });

    replaceComponent(loginByEmail)
})

page('/brouillon-produit', ({path:route}) => {
    console.log('ROUTER', route);

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
        relevantResources: []
    }
    function findRelevantResources(allResources, filters){
        return allResources.filter(r => {
            return filters.étapes.has(r.attributes.etape) && 
                (Array.isArray(r.attributes.thematique) ? 
                    r.attributes.thematique.some(t => filters.thématiques.has(t)) :
                    filters.thématiques.has(r.attributes.thematique))
        })
    }

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

    function render(){
        assistantUI.$set({
            ...state, 
            étapeFilterChange, 
            thématiqueFilterChange
        })
    }

    const assistantUI = new Assistant({
        target: document.querySelector('.svelte-main'),
        props: {
            ...state, 
            étapeFilterChange, 
            thématiqueFilterChange
        }
    });

    replaceComponent(assistantUI);

    const octokit = new Octokit()

    const owner = 'betagouv';
    const repo = 'urbanvitaliz'
    const path = 'TMP_resources'

    octokit.repos.getContent({
        owner,
        repo,
        path,
    }).then(({data}) => {
        const relevantFiles = data.filter(
            ({name, type}) => type === "file" && name.endsWith('.md')
        );

        return Promise.allSettled(
            relevantFiles.map( f => fetch(f.url).then(r => r.json()) )
        )
        .then(rs => rs
            .filter(r => r.status === 'fulfilled')
            .map(r => r.value)
            .map(({path, content}) => {
                const {body, attributes} = frontmatter( Buffer.from(content, 'base64').toString('utf-8') )
                
                return { url: `/${repo}/${path.replace(/\.[^/.]+$/, "")}`, content: body, attributes }
            })
        )
    })
    .then(resources => {
        const étapesOptions = new Set(resources.map(r => r.attributes.etape))
        const thématiquesOptions = new Set( resources.map(r => r.attributes.thematique).flat() )

        state.étapes = [...étapesOptions];
        state.thématiques = [...thématiquesOptions];

        state.allResources = resources;
        state.relevantResources = findRelevantResources(resources, state.filters)

        render()
    })

});

page('/liste-ressources', context => {
    const params = new URLSearchParams(context.querystring);
    console.log('secret :',params.get('secret'));
});

page.start()