<script>
    import ResourceFilters from "./ResourceFilters.svelte";
    import ResourceList from "./ResourceList.svelte";
    import Squelette from "./Squelette.svelte";

    import findRelevantResourcesFromFilters from '../findRelevantResourcesFromFilters.js';


    export let allEtapes;
    export let allThématiques;
    export let allResources;

    export let bookmarkedResourceIdSet;

    export let makeBookmarkResource;
    export let makeUnbookmarkResource;
    
    export let listeRessourceURL;

    let filters = {
        étapes: new Set(allEtapes),
        thématiques: new Set(allThématiques)
    };
    $: console.log("étapes:",allEtapes)
    $: filters = {
        étapes: new Set(allEtapes),
        thématiques: new Set(allThématiques)
    };

    let étapeFilterChange = function toggleÉtapeFilter(étape){
        console.log("étape dans filterChange: ", étape)
        if(filters.étapes.has(étape))
            filters.étapes.delete(étape)
        else
            filters.étapes.add(étape)
        console.log(filters.étapes)
        filters = filters;
    };

    let thématiqueFilterChange = function toggleThématiquesFilter(thématique){
        if(filters.thématiques.has(thématique))
            filters.thématiques.delete(thématique)
        else
            filters.thématiques.add(thématique)
    };
    $: console.log(filters)
    let relevantResources = [];
    $: relevantResources = findRelevantResourcesFromFilters(allResources, filters)
    
</script>

<Squelette {listeRessourceURL}>
    <svelte:fragment slot="colonne-du-centre">
        <h3>Toutes les Ressources</h3>

        <ResourceFilters
            étapes={allEtapes}
            thématiques={allThématiques}
            {filters}
            {étapeFilterChange}
            {thématiqueFilterChange}
        />
        <h4>{relevantResources.length} Ressources trouvées</h4>

        <ResourceList
            resources={relevantResources}
            {makeBookmarkResource}
            {makeUnbookmarkResource}
            {bookmarkedResourceIdSet}
        />
    </svelte:fragment>
    
    
    
</Squelette>

<style lang="scss">
    @import "../../node_modules/@gouvfr/dsfr/packages/schemes/src/styles/settings/_colors.scss";

    h3, h4{
        color: $blue-france-500;
    }
    
</style>
