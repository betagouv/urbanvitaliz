<script>
    // Listes de toutes les étapes et thématiques disponible
    export let étapes;
    export let thématiques;

    export let étapeFilterChange;
    export let thématiqueFilterChange;

    // Object complexe : qui contient étapes et thématiques sélectionnées par l'utilisateur.rice
    export let filters;

</script>

<section class="filters">
    <section class="étapes">
        <div class="rf-form-group">
            <fieldset class="rf-fieldset">
                <legend class="rf-fieldset__legend">Filtrer par étapes</legend>
                <div class="rf-fieldset__content">
                {#each étapes as étape}
                    <div class="NOT-rf-checkbox-group">
                        <label>
                            <input 
                                type="checkbox" 
                                name="Étape"
                                checked={filters.étapes.has(étape)}
                                on:change={e => étapeFilterChange(étape)}
                            />
                            {étape}
                        </label>
                    </div>
                {/each}
                </div>
            </fieldset>
        </div>
    </section>
    <section class="thématiques">
        <div class="rf-form-group">
            <fieldset class="rf-fieldset rf-fieldset--inline">
                <legend class="rf-fieldset__legend">Filtrer par thématiques</legend>
                <div class="rf-fieldset__content">
                {#each thématiques as thematique}

                <div class="NOT-rf-checkbox-group">
                    <label>
                        <input 
                            type="checkbox" 
                            name="Thématique" 
                            checked={filters.thématiques.has(thematique)}
                            on:change={e => thématiqueFilterChange(thematique)}
                        />
                        {thematique}
                    </label>
                </div>
                {/each}
            </fieldset>
        </div>
    </section>
</section>

<style lang="scss">
    @import "../../node_modules/@gouvfr/dsfr/packages/schemes/src/styles/settings/_colors.scss";
    section.filters{
        display: flex;
        flex-direction: row;
    }

    section.étapes{
        flex: 1;
    }

    section.thématiques{
        flex: 1;
    }

    label{
        display: inline-block;
        cursor: pointer;
    }

    label:hover{
        background-color: hsla(0, 0%, 0%, 0.1);
    }

    .étapes label{
        display: block;
    }

    .rf-fieldset__content{
        display: flex;
        flex-direction: column;
        margin: 0;
    }

    section label{
        margin-right: 1rem;
    }

    input{
        cursor: pointer;
        margin-right: 0.25rem;
    }
    .rf-fieldset__legend{
        color: $grey-800;
        font-weight: normal;
        margin-bottom: 0.5rem;
    }

   
</style>
