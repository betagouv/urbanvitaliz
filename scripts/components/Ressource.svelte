<script>
    import Squelette from './Squelette.svelte'

    export let ressource = {};

</script>

<Squelette>
    <svelte:fragment slot="colonne-du-centre">
        <div class="markdown-container">
            <h1>{ressource.phrase_catch}</h1>
            {#if ressource.sous_titre === undefined}
                <p></p>
            {:else}
                <p>{ressource.sous_titre}</p>
            {/if}
            {@html ressource.output}
            <!-- <SvelteMarkdown source={ressource.content} /> -->
        </div>
    </svelte:fragment>

    <svelte:fragment slot="colonne-de-droite">
        
    </svelte:fragment>
</Squelette>

<style lang="scss">
    @import "../../node_modules/@gouvfr/dsfr/packages/schemes/src/styles/settings/_colors.scss";

    .markdown-container h1{
        color: $blue-france-500;
        font-size: 28px;
        line-height: 1.2em;
    }
    .markdown-container :global(p, li){
        font-size: 16px;
        line-height: 1.5em;
    }
    .markdown-container :global(img){
        max-width: 100%;
    }
    .markdown-container{
        max-width: 100%;
    }
</style>
