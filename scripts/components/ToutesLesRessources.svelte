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

    let userFilters = {
        étapes: new Set(),
        thématiques: new Set()
    };

    let étapeFilterChange = function toggleÉtapeFilter(étape){
        console.log("étape dans filterChange: ", étape)
        if(userFilters.étapes.has(étape))
            userFilters.étapes.delete(étape)
        else
            userFilters.étapes.add(étape)
        
        userFilters = userFilters // to trigger svelte re-render
    };

    let thématiqueFilterChange = function toggleThématiquesFilter(thématique){
        if(userFilters.thématiques.has(thématique))
            userFilters.thématiques.delete(thématique)
        else
            userFilters.thématiques.add(thématique)

        userFilters = userFilters // to trigger svelte re-render
    };

    let filters = {
        étapes: new Set(allEtapes),
        thématiques: new Set(allThématiques)
    }

    let relevantResources = [];
    $: {
        // building filters by substracting all étapes/thématiques from userFilters
        filters = {
            étapes: new Set(allEtapes),
            thématiques: new Set(allThématiques)
        };

        for(const e of userFilters.étapes){
            filters.étapes.delete(e)
        }

        for(const t of userFilters.thématiques){
            filters.thématiques.delete(t)
        }

        relevantResources = findRelevantResourcesFromFilters(allResources, filters)
    }
    
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
