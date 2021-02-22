import { Octokit } from '@octokit/rest';
import frontmatter from 'front-matter';

import Assistant from './Assistant.svelte';

const Buffer = buffer.Buffer;

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
