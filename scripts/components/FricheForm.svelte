<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let name;
    let address;

    function onSubmit(e){
        e.preventDefault()
        // TODO typecheck friche object here
        dispatch('new-friche', {
            name,
            address
        })
    }
</script>

<h1>Créer une nouvelle friche</h1>

<form on:submit={onSubmit}>
    <label>
        <span>Nom</span>
        <input bind:value={name} type="text">
    </label>
    <label>
        <span>Adresse</span>
        <input bind:value={address} type="text">
    </label>
    <button type="submit">Créer</button>
</form>

<style>
</style>
