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
                <legend class="rf-fieldset__legend">Étape</legend>
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
    <section>
        <div class="rf-form-group">
            <fieldset class="rf-fieldset rf-fieldset--inline">
                <legend class="rf-fieldset__legend">Thématique</legend>
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

<style>
    section.filters{
        margin-bottom: 2rem;
    }

    section.filters > section{
        margin-bottom: 1.75rem;
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

    section label{
        margin-right: 1rem;
    }

    input{
        cursor: pointer;
        margin-right: 0.25rem;
    }
</style>
