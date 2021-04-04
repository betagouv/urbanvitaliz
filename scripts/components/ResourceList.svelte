<script>
    import ResourceOverview from './ResourceOverview.svelte';

    export let resources;
    export let makeBookmarkResource;
    export let makeUnbookmarkResource;
    export let bookmarkedResourceIdSet;
</script>

<section>
    {#if resources.length === 0}
        <p>(Pas de ressource)</p>
    {:else}
        <ul>
            {#each resources as resource}
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
</section>

<style lang="scss">
    @import "../../node_modules/@gouvfr/dsfr/packages/schemes/src/styles/settings/_colors.scss";
    h4{
        padding-bottom: 0.5rem;
        color: $blue-france-500;
    }

    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }

    $gutter-width: 0.7rem;
    li{
        display: inline-block;
        text-align: initial;

        vertical-align: top;
        width:  calc((100% - (0.7rem * 2)) / 3);

        margin-left: $gutter-width;
        margin-bottom: $gutter-width;

        &:nth-of-type(3n+1){
            margin-left: 0;
        }
    }
</style>
