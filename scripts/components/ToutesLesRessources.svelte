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
        <h3>Toutes les Ressources</h3>

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
    </section>

    <section class="colonne-de-droite">
        
    </section>
</div>

<style lang="scss">
    @import "../../node_modules/@gouvfr/dsfr/packages/schemes/src/styles/settings/_colors.scss";

    .flex-container{
        display: flex;
        flex-direction: row;
    }
    .colonne-de-gauche{
        background-color: #F8F8F8;
        flex: 3;
    }
    .rf-sidemenu{
        padding-right: 0
    }
    .rf-sidemenu__inner{
        width: 17rem;
        border: none;
    }
    .rf-sidemenu__link{
        font-size: 16px;
        line-height: 1.5em;
    }
    .rf-fi-file-fill{
        padding-right: 0.5rem;
    }
    h3{
       color: $blue-france-500; 
    }
    .colonne-du-centre{
        padding: 0.5rem 1rem;
        flex: 10;
    }
    .colonne-de-droite{
        background-color: hsl(240, 36.8%, 96.3%);
        flex: 3;

    }
</style>
