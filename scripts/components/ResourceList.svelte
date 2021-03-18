<script>
    import ResourceOverview from './ResourceOverview.svelte';

    export let relevantResources;
    export let makeBookmarkResource;
    export let makeUnbookmarkResource;
    export let bookmarkedResourceIdSet;
</script>

<section>
    <h2>Liste des ressources pertinentes ({relevantResources.length})</h2>

    {#if relevantResources.length === 0}
        <p>(Pas de ressource pertinente pour le moment)</p>
    {:else}
        <ul>
            {#each relevantResources as resource}
            <li>
                <ResourceOverview 
                    resource={resource}
                    bookmarkResource={makeBookmarkResource && !bookmarkedResourceIdSet.has(resource.id) && makeBookmarkResource(resource.id)}
                    unbookmarkResource={makeUnbookmarkResource && bookmarkedResourceIdSet.has(resource.id) && makeUnbookmarkResource(resource.id)}
                />
            </li>
            {/each}
        </ul>
    {/if}
    <a href="./liste-ressources">Revenir à la liste de ressource bookmarker</a>
</section>

<style>
    h2{
        padding-bottom: 0.5rem;
        border-bottom: 1px solid grey;
    }

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
