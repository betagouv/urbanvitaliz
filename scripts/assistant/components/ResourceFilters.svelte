<script>
    export let étapes;
    export let thématiques;
</script>

<section class="filters">
    <section>
        <h3>Étape</h3>
        {#each étapes as étape}
            <label>{étape}
                <input type="checkbox" name="Étape" value="{étape}" />
            </label>
        {/each}
    </section>
    <section>
        <h3>Thématique</h3>
        {#each thématiques as thematique}
            <label>{thematique}
                <input type="checkbox" name="Thématique" value="{thematique}" />
            </label>
        {/each}
    </section>
</section>

<style>
</style>
