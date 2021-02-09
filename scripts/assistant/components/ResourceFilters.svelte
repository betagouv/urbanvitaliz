<script>
    export let étapes;
    export let thématiques;

    export let étapeFilterChange;
    export let thématiqueFilterChange;

    export let filters;
</script>

<section class="filters">
    <section class="étapes">
        <h3>Étape</h3>
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
        <h3>Thématique</h3>
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
