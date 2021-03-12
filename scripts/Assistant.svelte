<script>
    import ResourceFilters from './assistant/components/ResourceFilters.svelte';
    import ResourceList from './assistant/components/ResourceList.svelte';


    export let étapes;
    export let thématiques;

    export let filters;
    export let étapeFilterChange;
    export let thématiqueFilterChange;

    export let relevantResources;
    export let bookmarkedResourceIdSet;

    export let makeBookmarkResource;
    export let makeUnbookmarkResource;
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

<style>
    h1{
        margin-bottom: 2.5rem;
    }
</style>
