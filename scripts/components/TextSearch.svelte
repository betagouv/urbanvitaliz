<script>
    export let findRelevantRessources = () => {};
    

    let text = '';

    $ : ressources = findRelevantRessources(text)
</script>

<section>
    <h1>Recherche textuelle de ressources pertinentes</h1>
    <p>
        Décrivez en quelques phrases votre friche, votre projet et vos difficultés éventuelles :
    </p>

    <textarea class="rf-input" bind:value={text}></textarea>
</section>

<section>
    <h2>Ressources proposées par rapport à ce que vous avez saisi :</h2>
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
