<script>   
    import ResourceFilters from "./ResourceFilters.svelte";
    import ResourceList from "./ResourceList.svelte";
    import Squelette from "./Squelette.svelte";
    export let listeRessourceURL;
    
    export let étapes;
    export let thématiques;

    export let filters;
    export let étapeFilterChange;
    export let thématiqueFilterChange;

    export let makeBookmarkResource;
    export let makeUnbookmarkResource;
    export let bookmarkedResourceIdSet;
    export let findRelevantRessources = () => {};
    
    let text = '';

    $ : ressources = findRelevantRessources(text)
</script>

<Squelette {listeRessourceURL}>
    <svelte:fragment slot="colonne-du-centre">
        <section>
            <h3>Rechercher une ressource</h3>
            <p>
                J’ai une friche à réhabiliter et je rencontre les difficultés suivantes :
                Vous pouvez décrire précisement le projet et les soucis que vous rencontrez comme dans un email.
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
            {#if Array.isArray(ressources) && ressources.length >= 1}
            <h4>{ressources.length} Ressources pertinentes</h4>
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
</Squelette>


<style lang="scss">
    @import "../../node_modules/@gouvfr/dsfr/packages/schemes/src/styles/settings/_colors.scss";

    h3, h4{
        color: $blue-france-500;
    }
</style>
