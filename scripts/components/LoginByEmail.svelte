<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let email;

    const onSubmit = e => {
        e.preventDefault()
        dispatch('email', email)
    }
</script>

<h1>Connection par email</h1>
<p>Saisissez votre email pour créer un compte ou retrouver votre compte</p>

<form on:submit="{onSubmit}">
    <label>
        <span>Email</span>
        <input bind:value={email} type="email" placeholder="perrine@commune.fr" autocomplete="email">
        <button type="submit">C'est ti-par !</button>
    </label>
</form>

<style>
</style>
