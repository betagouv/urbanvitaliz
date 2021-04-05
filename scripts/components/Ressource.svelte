<script>
    import Squelette from './Squelette.svelte'

    export let listeRessourceURL;
    export let ressource = {};

    export let bookmarkResource;
    export let unbookmarkResource;

</script>

<Squelette {listeRessourceURL}>
    <svelte:fragment slot="colonne-du-centre">
        <div class="markdown-container">
            <h1>{ressource.phrase_catch}</h1>
            {#if ressource.sous_titre === undefined}
                <p></p>
            {:else}
                <p>{ressource.sous_titre}</p>
            {/if}
            {@html ressource.output}
        </div>
    </svelte:fragment>

    <svelte:fragment slot="colonne-de-droite">
        <section class="ressource-side">
            {#if typeof unbookmarkResource === 'function'}
                <button class="rf-btn rf-btn--secondary" on:click={unbookmarkResource}>🌟 Supprimer</button>
            {/if}
            {#if typeof bookmarkResource === 'function'}
                <button class="rf-btn rf-btn--secondary" on:click={bookmarkResource}>☆ Enregistrer</button>
            {/if}

            <h4>Êtes-vous satisfait de cette page ?</h4>
            <button class="rf-btn rf-btn--secondary">Faire une suggestion</button>
        </section>
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

    .ressource-side{
        display: flex;
        flex-direction: column;
        align-items: center;

        h4{
            font-size: 20px;
            color: $blue-france-500;

            margin-top: 1em;
        }
    }
</style>
