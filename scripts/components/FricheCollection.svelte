<script>
    export let email;
    export let friches;
    export let onAddFriche = undefined;
</script>

<h1>Liste des friches de {email}</h1>

{#if friches.length === 0}
	<p>(Pas de friche pour le moment)</p>
{:else}
	<table>
        <thead>
            <tr>
                <th>Nom de la friche</th>
                <th>Adresse</th>
            </tr>
        </thead>
        <tbody>
            {#each friches as friche}
            <tr>
                <td>{friche.name}</td>
                <td>{friche.address}</td>
            </tr>
            {/each}
        </tbody>
    </table>
{/if}

{#if onAddFriche}
<button on:click={() => onAddFriche()}>Rajouter une friche</button>
{/if}

<style>
</style>
