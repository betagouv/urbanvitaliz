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
        <ResourceList
            {relevantResources}
            {makeBookmarkResource}
            {makeUnbookmarkResource}
            {bookmarkedResourceIdSet}
        />
    </svelte:fragment>
</Squelette>

<style lang="scss">
    @import "../../node_modules/@gouvfr/dsfr/packages/schemes/src/styles/settings/_colors.scss";

    h3 {
        color: $blue-france-500;
    }
</style>
