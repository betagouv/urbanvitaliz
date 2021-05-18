<script>
    import baseUrl from '../baseUrl.js'
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
            {#if ressource.sous_titre !== undefined}
                <p><em>{ressource.sous_titre}</em></p>
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
            <section class="smiley">
            <img src="{baseUrl}/assets/images/smiley-sad-1-alternate.svg" alt="personne très triste"/>
            <img src="{baseUrl}/assets/images/smiley-unhappy-1-alternate.svg" alt="personne triste"/>
            <img src="{baseUrl}/assets/images/smiley-indiferent-1-alternate.svg" alt="personne neutre"/>
            <img src="{baseUrl}/assets/images/smiley-smirk-alternate.svg" alt="personne heureuse"/>
            <img src="{baseUrl}/assets/images/smiley-smile-1-alternate-1.svg" alt="personne très heureuse"/>
            </section>
            <button class="rf-btn rf-btn--secondary">Faire une suggestion</button>
            
        </section>
    </svelte:fragment>
</Squelette>

<style lang="scss">
 @import "../../node_modules/@gouvfr/dsfr/packages/schemes/src/styles/settings/_colors.scss";

 .markdown-container h1{
     color: $blue-france-500;
     font-size: 28px;
     line-height: 1.75rem;
 }

 .markdown-container :global(h2) {
     font-size: 24px !important;
     line-height: 1.5rem;
 }
 .markdown-container :global(h3) {
     font-size: 20px;
     line-height: 1.1rem;
 }

 .markdown-container :global(p){
     margin-bottom: 1.5em;
 }

 .markdown-container :global(ul){
     margin-bottom: 1.5em;
 }

 .markdown-container :global(p, li){
     font-size: 16px;
     line-height: 1.1rem;
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
     flex-wrap: wrap;

     h4{
         font-size: 20px;
         color: $blue-france-500;

         margin-top: 1em;
     }
     .smiley{
         display: flex;
         flex-direction: row;
         align-items: center;
         img{
             padding: 0.7rem;
             margin-bottom: 0.6rem;
         }
     }
 }
</style>
