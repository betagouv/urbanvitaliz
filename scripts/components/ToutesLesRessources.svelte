<script>
    import ResourceFilters from "./ResourceFilters.svelte";
    import ResourceList from "./ResourceList.svelte";
    import Squelette from "./Squelette.svelte";

    export let étapes;
    export let thématiques;

    export let filters;
    export let étapeFilterChange;
    export let thématiqueFilterChange;

    export let relevantResources;
    export let bookmarkedResourceIdSet;

    export let makeBookmarkResource;
    export let makeUnbookmarkResource;
    
    export let listeRessourceURL;
</script>

<Squelette {listeRessourceURL}>
    <svelte:fragment slot="colonne-du-centre">
        <h3>Toutes les Ressources</h3>

        <ResourceFilters
            {étapes}
            {thématiques}
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
    
    <svelte:fragment slot="colonne-de-droite">
        <h1>{relevantResources.length}</h1>
        <p>Ressources pertinentes sur 98</p>
    </svelte:fragment>
    
</Squelette>

<style lang="scss">
    @import "../../node_modules/@gouvfr/dsfr/packages/schemes/src/styles/settings/_colors.scss";

    h3, h4{
        color: $blue-france-500;
    }
    h1{
        font-size: 20rem;
    }
    p{
        font-size: 36px;
    }
</style>
