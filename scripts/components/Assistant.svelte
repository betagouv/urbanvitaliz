<script>
    import ResourceFilters from './ResourceFilters.svelte';
    import ResourceList from './ResourceList.svelte';


    export let étapes;
    export let thématiques;

    export let filters;
    export let étapeFilterChange;
    export let thématiqueFilterChange;

    export let relevantResources;
    export let bookmarkedResourceIdSet;

    export let makeBookmarkResource;
    export let makeUnbookmarkResource;
    export let urlSecret;
</script>

<h1>Trouver des réponses pour réhabiliter mon site</h1> 

<ResourceFilters 
    étapes={étapes} 
    thématiques={thématiques} 
    filters={filters} 
    étapeFilterChange={étapeFilterChange} 
    thématiqueFilterChange={thématiqueFilterChange}
/>
<ResourceList 
    relevantResources={relevantResources} 
    makeBookmarkResource={makeBookmarkResource}
    makeUnbookmarkResource={makeUnbookmarkResource}
    bookmarkedResourceIdSet={bookmarkedResourceIdSet}
/>
{#if urlSecret}
    <a href="{urlSecret}">Revenir à la liste de ressource bookmarker</a>
{/if}
<style>
</style>
