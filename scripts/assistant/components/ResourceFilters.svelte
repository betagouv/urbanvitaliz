<script>
    export let étapes;
    export let thématiques;

    export let étapeFilterChange;
    export let thématiqueFilterChange;

    export let filters;
</script>

<section class="filters">
    <section>
        <h3>Étape</h3>
        {#each étapes as étape}
            <label>{étape}
                <input 
                    type="checkbox" 
                    name="Étape"
                    checked={filters.étapes.has(étape)}
                    on:change={e => étapeFilterChange(étape)}
                />
            </label>
        {/each}
    </section>
    <section>
        <h3>Thématique</h3>
        {#each thématiques as thematique}
            <label>{thematique}
                <input 
                    type="checkbox" 
                    name="Thématique" 
                    checked={filters.thématiques.has(thematique)}
                    on:change={e => thématiqueFilterChange(thematique)}
                />
            </label>
        {/each}
    </section>
</section>

<style>
    label{
        display: inline-block;
        cursor: pointer;
    }

    label:hover{
        background-color: hsla(0, 0, 0, 0.1);
    }

    section label:not(:first-of-type){
        margin: 0 1em;
    }

    input{
        cursor: pointer;
        margin-left: 0.2em;
    }

</style>
