<script>
    import ResourceFilters from './assistant/components/ResourceFilters.svelte';
    import ResourceList from './assistant/components/ResourceList.svelte';


    export let étapes;
    export let thématiques;

    export let filters;

    export let resources;
</script>

<ResourceFilters étapes={étapes} thématiques={thématiques} filters={filters} />
<ResourceList resources={resources} />

<style>
</style>
