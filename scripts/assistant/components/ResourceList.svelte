<script>
    import Resource from './Resource.svelte';

    export let relevantResources;
</script>

<section>
    <h2>Liste des ressources pertinentes ({relevantResources.length})</h2>

    {#if relevantResources.length === 0}
        <p>(Pas de ressource pertinente pour le moment)</p>
    {:else}
        <ul>
            {#each relevantResources as resource}
            <li>
                <Resource resource={resource}/>
            </li>
            {/each}
        </ul>
    {/if}
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

        border: 1px solid grey;
        border-radius: 0.5rem;
        margin: 0.5rem;
        padding: 0.5rem;
    }
</style>
