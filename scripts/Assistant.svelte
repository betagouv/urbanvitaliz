<script>
    import ResourceFilters from './assistant/components/ResourceFilters.svelte';
    import ResourceList from './assistant/components/ResourceList.svelte';


    export let étapes;
    export let thématiques;

    export let filters;
    export let étapeFilterChange;
    export let thématiqueFilterChange;

    export let relevantResources;
</script>

<ResourceFilters 
    étapes={étapes} 
    thématiques={thématiques} 
    filters={filters} 
    étapeFilterChange={étapeFilterChange} 
    thématiqueFilterChange={thématiqueFilterChange}
/>
<ResourceList relevantResources={relevantResources} />

<style>
</style>
