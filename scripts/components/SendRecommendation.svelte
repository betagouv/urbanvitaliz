<script>
    export let persons = [
        {emails: ['a@a.a']},
        {emails: ['b@b.b']},
        {emails: ['c@c.c']}
    ];

    let emails = persons.map( p => p.emails ).flat()

    export const ressources = [
        {phrase_catch: 'yo'},
        {phrase_catch: 'ahah'},
        {phrase_catch: 'lol'},
    ]

    let chosenEmail = '';
    let chosenPerson = undefined;
    $: chosenPerson = persons.find(p => p.emails.includes(chosenEmail))

    let chosenResourcePhraseCatch = '';
    let chosenResource = undefined;
    $: chosenResource = ressources.find(r => r.phrase_catch === chosenResourcePhraseCatch)

    let message = '';

    function sendRecommandation(e){
        e.preventDefault()
        console.log('Sending recommandation to', chosenPerson, 'ressource', chosenResource, 'with message', message)
    }
</script>

<form on:submit={sendRecommandation}>

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

        <datalist id="listeRessources">
            {#each ressources as ressource}
            <option value="{ressource.phrase_catch}"></option>
            {/each}
        </datalist>
    </section>

    <section>
        <h2>Commentaire de l'équipe Urban Vitaliz</h2>
        <textarea class="rf-input" bind:value={message}></textarea>
    </section>

    <button type="submit">Envoyer</button>

</form>

<style>
</style>
