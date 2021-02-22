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
        <h2>Étape</h2>
        {#each étapes.sort() as étape}
            <label>
                <input 
                    type="checkbox" 
                    name="Étape"
                    checked={filters.étapes.has(étape)}
                    on:change={e => étapeFilterChange(étape)}
                />
                {étape}
            </label>
        {/each}
    </section>
    <section>
        <h2>Thématique</h2>
        {#each thématiques as thematique}
            <label>
                <input 
                    type="checkbox" 
                    name="Thématique" 
                    checked={filters.thématiques.has(thematique)}
                    on:change={e => thématiqueFilterChange(thematique)}
                />
                {thematique}
            </label>
        {/each}
    </section>
</section>

<style>
    section.filters{
        margin-bottom: 2rem;
    }

    section.filters > section{
        margin-bottom: 1.75rem;
    }

    h2{
        font-size: 1.5rem;
        margin-bottom: 1rem;
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
