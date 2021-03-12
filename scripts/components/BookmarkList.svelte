<script>
    import ResourceOverview from '../assistant/components/ResourceOverview.svelte';

    export let bookmarkedResources = undefined;
    export let makeUnbookmarkResource = undefined;
</script>

<h1>Liste des ressources favorites</h1>

{#if bookmarkedResources}
<ul>
    {#each bookmarkedResources as resource}
    <li>
        <ResourceOverview 
            resource={resource}
            unbookmarkResource={makeUnbookmarkResource && makeUnbookmarkResource(resource.id)}    
        />
    </li>
    {/each}
</ul>
{/if}

<a href="./brouillon-produit">Chercher d'autres ressources</a>

<style>
    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    li{
        display: inline-block;
        text-align: initial;

        vertical-align: top;
        width: 15rem;

        margin: 0.5rem;
    }
</style>
