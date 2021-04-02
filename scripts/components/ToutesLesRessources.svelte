<script>
    import ResourceFilters from "./ResourceFilters.svelte";
    import ResourceList from "./ResourceList.svelte";

    export let étapes;
    export let thématiques;

    export let filters;
    export let étapeFilterChange;
    export let thématiqueFilterChange;

    export let relevantResources;
    export let bookmarkedResourceIdSet;

    export let makeBookmarkResource;
    export let makeUnbookmarkResource;
    export let urlSecret;
</script>

<div class="flex-container">
    <section class="colonne-de-gauche">
        <nav class="rf-sidemenu" aria-label="Menu latéral">
            <div class="rf-sidemenu__inner">
                <button
                    class="rf-sidemenu__btn"
                    hidden
                    aria-controls="rf-sidemenu-wrapper"
                    aria-expanded="false">Dans cette rubrique</button
                >
                <div class="rf-collapse" id="rf-sidemenu-wrapper">
                    <ul class="rf-sidemenu__list">
                        <!-- <li class="rf-sidemenu__item rf-sidemenu__item--active">
                    <a class="rf-sidemenu__link" href="#" target="_self" aria-current="page">Accès direct</a>
                </li> -->
                        <li class="rf-sidemenu__item">
                            <a class="rf-sidemenu__link" href="#" target="_self"><span class="rf-fi-file-fill" aria-hidden="true"></span>Rechercher une ressource</a>
                        </li>
                        <li class="rf-sidemenu__item">
                            <a class="rf-sidemenu__link" href="#" target="_self"><span class="rf-fi-file-fill" aria-hidden="true"></span>Mes ressources</a>
                        </li>
                        <li class="rf-sidemenu__item">
                            <a class="rf-sidemenu__link" href="#" target="_self"><span class="rf-fi-file-fill" aria-hidden="true"></span>Toutes les ressources</a>
                        </li>
                        <li class="rf-sidemenu__item">
                            <a class="rf-sidemenu__link" href="#" target="_self"><span class="rf-fi-file-fill" aria-hidden="true"></span>Méthodologie</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </section>

    <section class="colonne-du-centre">
        <h1>Toutes les Ressources</h1>

        <ResourceFilters
            {étapes}
            {thématiques}
            {filters}
            {étapeFilterChange}
            {thématiqueFilterChange}
        />
        <ResourceList
            {relevantResources}
            {makeBookmarkResource}
            {makeUnbookmarkResource}
            {bookmarkedResourceIdSet}
        />
        {#if urlSecret}
            <a href={urlSecret}>Revenir à ma liste de ressources enregistrées</a
            >
        {/if}
    </section>

    <section class="colonne-de-droite">je suis une colonne de droite.</section>
</div>

<style lang="scss">
    $blue-france: pink;
    .flex-container{
        display: flex;
        flex-direction: row;
    }
    .colonne-de-gauche{
        background-color: #F8F8F8;
    }
    .rf-sidemenu{
        padding-right: 0;
    }
    .rf-sidemenu__inner{
        width: 17rem;
    }
    .rf-sidemenu__link{
        font-size: 16px;
        line-height: 1.5em;
    }
    .rf-fi-file-fill{
        padding-right: 0.5rem;
    }
    h1{
       color: $blue-france; 
    }
</style>
