import {json} from 'd3-fetch';
import Assistant from './Assistant.svelte';

const svelteTarget = document.querySelector('.svelte-main')

const allResources = [
    {
        titre: "Les Sentiments du prince Charles",
        etape: '1 - le début',
        thematique: 'chou' 
    },
    {
        titre: "La rose la plus rouge s’épanouit",
        etape: "12 - genre après",
        thematique: 'chou' 
    },
    {
        titre: "Virginie Despentes – Meuf King Kong",
        etape: "1 - le début",
        thematique: 'patate' 
    },
    {
        titre: "Virginie Despentes – Queen Spirit",
        etape: "37 - vers la fin",
        thematique: 'patate' 
    },
]

const state = {
    étapes: ["1 - le début", "2 - le milieu", "12 - genre après", "37 - vers la fin"],
    thématiques: ['chou', 'patate'],
    filters: {
        étapes: new Set(),
        thématiques: new Set()
    },
    relevantResources: allResources
}

state.filters.étapes = new Set(state.étapes);
state.filters.thématiques = new Set(state.thématiques);

function findRelevantResources(allResources, filters){
    return allResources.filter(r => {
        return filters.étapes.has(r.etape) && filters.thématiques.has(r.thematique)
    })
}

function étapeFilterChange(étape){
    if(state.filters.étapes.has(étape))
        state.filters.étapes.delete(étape)
    else
        state.filters.étapes.add(étape)

    state.relevantResources = findRelevantResources(allResources, state.filters)

    setProps()
}

function thématiqueFilterChange(thématique){
    if(state.filters.thématiques.has(thématique))
        state.filters.thématiques.delete(thématique)
    else
        state.filters.thématiques.add(thématique)

    state.relevantResources = findRelevantResources(allResources, state.filters)

    setProps()
}

function setProps(){
    assistantUI.$set({
        ...state, 
        étapeFilterChange, 
        thématiqueFilterChange
    })
}

const assistantUI = new Assistant({
    target: svelteTarget,
    props: {
        ...state, 
        étapeFilterChange, 
        thématiqueFilterChange
    }
});
