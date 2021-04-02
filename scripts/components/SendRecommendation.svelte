<script>
    export let persons = undefined;

    let emails;

    $: emails = persons.map( p => p.emails ).flat()

    export let ressources = undefined;

    let chosenEmail = '';
    let chosenPerson = undefined;
    $: chosenPerson = persons.find(p => p.emails.includes(chosenEmail))

    let chosenResourcePhraseCatch = '';
    let chosenResource = undefined;
    $: chosenResource = ressources && ressources.find(r => r.phrase_catch === chosenResourcePhraseCatch)

    let message = '';

    export let sendRecommandation
</script>

<form on:submit={e => {
    e.preventDefault()
    sendRecommandation(chosenPerson, chosenResource, message)
}}>

    <h1>Envoi de recommandation</h1>

    <section>
        <h2>À quelle collectivité ?</h2>
        
        <input list="emails" bind:value={chosenEmail} />

        <datalist id="emails">
            {#each emails as email}
            <option value="{email}"></option>
            {/each}
        </datalist>
    </section>

    <section>
        <h2>Recommander quelle ressource ?</h2>

        <input list="listeRessources" bind:value={chosenResourcePhraseCatch} />

        {#if ressources}
            <datalist id="listeRessources">
                {#each ressources as ressource}
                <option value="{ressource.phrase_catch}"></option>
                {/each}
            </datalist>
        {/if}
    </section>

    <section>
        <h2>Commentaire de l'équipe Urban Vitaliz</h2>
        <textarea class="rf-input" bind:value={message}></textarea>
    </section>

    <button class="rf-btn" type="submit">Envoyer</button>

</form>

<style>
</style>
