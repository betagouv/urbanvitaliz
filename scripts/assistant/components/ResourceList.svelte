<script>
    export let resources;
</script>

<section>
    <h2>Liste des ressources pertinentes</h2>

    {#if resources.length === 0}
        <p>(Pas de ressource pertinente pour le moment)</p>
    {:else}
        <ul>
            {#each resources as resource}
            <li>
                {resource.titre}
            </li>
            {/each}
        </ul>
    {/if}
</section>

<style>
    
</style>
