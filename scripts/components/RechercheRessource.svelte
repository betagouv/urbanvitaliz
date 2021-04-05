<script>   
    import ResourceFilters from "./ResourceFilters.svelte";
    import ResourceList from "./ResourceList.svelte";
    import Squelette from "./Squelette.svelte";
    export let listeRessourceURL;
    
    export let étapes;
    export let thématiques;
    export let allResources = [];

    export let filters;
    export let étapeFilterChange;
    export let thématiqueFilterChange;

    export let makeBookmarkResource;
    export let makeUnbookmarkResource;
    export let bookmarkedResourceIdSet;
    export let findRelevantRessources = () => {};
    
    let text = '';
    
    $ : ressources = findRelevantRessources(text) || []
</script>

<Squelette {listeRessourceURL}>
    <svelte:fragment slot="colonne-du-centre">
        <section class="filtre-resources">
            <h3>Rechercher une ressource</h3>
            <p>
                J’ai une friche à réhabiliter et je rencontre les difficultés suivantes :<br>
                <em>Vous pouvez décrire précisement le projet et les soucis que vous rencontrez comme dans un email.</em>
            </p>
            <textarea class="rf-input" bind:value={text}></textarea>

            <ResourceFilters
                {étapes}
                {thématiques}
                {filters}
                {étapeFilterChange}
                {thématiqueFilterChange}
            />
        </section>

        <section>
            <h4>{ressources.length} Ressources pertinentes</h4>
            {#if ressources.length >= 1}
            
            <ResourceList
                resources={ressources}
                {makeBookmarkResource}
                {makeUnbookmarkResource}
                {bookmarkedResourceIdSet}
            />
            {:else}
                <p>(aucune ressource pertinente pour le moment)</p>
            {/if}
        </section>
    </svelte:fragment>

    <svelte:fragment slot="colonne-de-droite">
        <section class="recherche-result-count">
            <h1>{ressources.length}</h1>
            <p>Ressources pertinentes sur {allResources.length}</p>
        </section>
    </svelte:fragment>
</Squelette>


<style lang="scss">
    @import "../../node_modules/@gouvfr/dsfr/packages/schemes/src/styles/settings/_colors.scss";

    .filtre-resources{
        h3, h4{
            color: $blue-france-500;
        }
        p{
            margin-bottom: 0.5rem;
        }
        textarea{
            height: 12rem;
            margin-bottom: 1rem;
        }
    }
    
    .recherche-result-count{
        margin-top: 16rem;
        text-align: center;
        h1{
            font-size: 150px;
            margin-bottom: 0.3em;
        }
        p{
            font-size: 36px;
            line-height: 1.5em;
        }
    } 
</style>
