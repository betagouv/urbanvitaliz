<script>
    export let findRelevantRessources = () => {};
    

    let text = '';

    $ : ressources = findRelevantRessources(text)
</script>

<section>
    <h1>Recherche textuelle</h1>
    <p>
        Dans la boîte ci-dessous, vous pouvez copier-coller tout texte qui concerne votre friche. 
        Idéalement, ces textes décrivent le blocage vous rencontrez actuellement, et ce n'est pas grave si ce n'est pas le cas
    </p>

    <textarea class="rf-input" bind:value={text}></textarea>
</section>

<section>
    <h2>Ressources sûrement pertinentes</h2>
    {#if Array.isArray(ressources) && ressources.length >= 1}
        <ul>
            {#each ressources as ressource}
            <li>
                <a href={ressource.url}>{ressource.phrase_catch}</a>
            </li>
            {/each}
        </ul>
    {:else}
        <p>(aucune ressource pertinente pour le moment)</p>
    {/if}
</section>


<style>
</style>
