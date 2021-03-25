<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let email;

    const onSubmit = e => {
        e.preventDefault()
        dispatch('email', email)
    }
</script>

<form on:submit={onSubmit}>
    <div class="rf-modal__header">
        <button type="button" class="rf-link--close rf-link" title="Fermer la fenêtre modale" aria-controls="rf-modal-login" target="_self">Fermer</button>
    </div>
    <div class="rf-modal__content">
        <h1 id="rf-modal-title-modal-2" class="rf-modal__title">Se connecter</h1>
        <label class="rf-label" for="text-input-text">Email</label>
        <input class="rf-input" bind:value={email} type="email" placeholder="perrine@commune.fr" autocomplete="email" name="urbanvitaliz-email">
        <!-- <p>Saisissez votre email afin de recevoir le lien de connection.</p> -->
    </div>
    <div class="rf-modal__footer">
        <ul class="rf-btns-group rf-btns-group--inline-lg rf-btns-group--icon-left">
            <li>
                <button type="submit" class="rf-btn">
                    Connexion
                </button>
            </li>
        </ul>
    </div>
</form>

<style>
</style>
