<script>
    import ResourceOverview from './ResourceOverview.svelte';

    export let bookmarkedResources = undefined;
    export let makeUnbookmarkResource = undefined;
    export let recommendations = undefined;
</script>

<section class="bookmarks">
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
</section> 


{#if recommendations}
<section class="recommendations">
    <h1>Recommandations de l'équipe UrbanVitaiz</h1>
    <ul>
        {#each recommendations as reco}
        <li>
            <ResourceOverview 
                resource={reco.resource}   
            />
            <strong>Message de l'équipe UrbanVitaiz&nbsp;:</strong>
            <p>{reco.message}</p>
        </li>
        {/each}
    </ul>
</section> 
{/if}

<a href="./brouillon-produit">Chercher d'autres ressources</a>

<style>
    .bookmarks ul, .recommendations ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .bookmarks ul li{
        display: inline-block;
        text-align: initial;

        vertical-align: top;
        width: 15rem;

        margin: 0.5rem;
    }

    .recommendations ul li {
        display: block;
        text-align: initial;

        width: 15rem;
    }
</style>
