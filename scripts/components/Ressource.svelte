<script>
    import SvelteMarkdown from 'svelte-markdown'
    import Squelette from './Squelette.svelte'

    export let ressource = {};

</script>

<Squelette>
    <svelte:fragment slot="colonne-du-centre">
        <div class="markdown-container">
            <h1>{ressource.phrase_catch}</h1>
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
    }
    .markdown-container{
        max-width: 100%;
    }
</style>
