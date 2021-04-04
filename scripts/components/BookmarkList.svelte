<script>
    import ResourceOverview from './ResourceOverview.svelte';
    import ResourceList from "./ResourceList.svelte";
    import Squelette from './Squelette.svelte'

    export let bookmarkedResources = [];
    export let makeUnbookmarkResource = undefined;
    export let makeBookmarkResource;
    export let recommendations = undefined;
    let bookmarkedResourceIdSet;
    $: bookmarkedResourceIdSet = new Set((bookmarkedResources || []).map(r => r.id));

</script>

<Squelette>
    <svelte:fragment slot="colonne-du-centre">
        <section class="bookmarks">
            <h3>Mes ressources</h3>
        
            <ResourceList
                resources={bookmarkedResources || []} 
                {makeUnbookmarkResource}
                {bookmarkedResourceIdSet}
            />
        </section> 
    </svelte:fragment>

    <svelte:fragment slot="colonne-de-droite">
        {#if recommendations}
        <section class="recommendations">
            <h4>Ressources conseillées</h4>
            <ul>
                {#each recommendations as reco}
                <li>
                    <ResourceOverview 
                        resource={reco.resource}
                        bookmarkResource={makeBookmarkResource && !bookmarkedResourceIdSet.has(reco.resource.id) && makeBookmarkResource(reco.resource.id)}   
                    />
                    <div class="message-bulle">
                        <span>Urbanvitaliz vous conseille cette ressource car :</span>
                        <p>{reco.message}</p>
                    </div>
                </li>
                {/each}
            </ul>
        </section> 
        {/if}
    </svelte:fragment>
</Squelette>

<style lang="scss">
    @import "../../node_modules/@gouvfr/dsfr/packages/schemes/src/styles/settings/_colors.scss";

    h3, h4{
        color: $blue-france-500;
    }
    .recommendations ul{
        display: flex;
        flex-direction: column;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .recommendations ul li {
        display: block;
        text-align: initial;

        width: 15rem;
    }

    $message-bulle-color: white;
    $message-bulle-distance: 1rem; 
    
    .message-bulle{
        position: relative;
        background-color: $message-bulle-color;
        padding: 0.5rem;
        margin-top: $message-bulle-distance;
        margin-bottom: 1.5rem;
        border-radius: 10px;
        border: 2px solid hsl(240, 39.9%, 64.1%);
        
        span{
            color: grey;
        }

        &::before{
            content: "";
            position: absolute;
            bottom: 100%;
            left: $message-bulle-distance;
            width: 0;
            height: 0;
            border-left: $message-bulle-distance/2 solid transparent;
            border-right: $message-bulle-distance/2 solid transparent;
            border-bottom: $message-bulle-distance solid $message-bulle-color;
        }
    }
</style>
