<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let inputEmail = "";
    export let person = undefined;

    const onSubmit = e => {
        e.preventDefault()
        dispatch('email', inputEmail)
    }
    $: console.log("person", person && person.emails)
</script>

{#if person === undefined}
    <button class="rf-btn rf-fi-account-fill rf-btn--icon-left" aria-expanded="false" aria-controls="rf-modal-login">
        Se connecter
    </button>
{:else}
    <strong class="rf-fi-account-fill rf-btn--icon-left">{person.emails[0]}</strong>
{/if}

<dialog aria-labelledby="rf-modal-title-modal-2" role="dialog" id="rf-modal-login" class="rf-modal">
    <div class="rf-container--fluid rf-container-md">
        <div class="rf-grid-row rf-grid-row--center">
            <div class="rf-col-12 rf-col-md-6">
                <div class="rf-modal__body">
                    <form on:submit={onSubmit}>
                        <div class="rf-modal__header">
                            <button type="button" class="rf-link--close rf-link" title="Fermer la fenêtre modale" aria-controls="rf-modal-login" target="_self">
                                Fermer
                            </button>
                        </div>
                        <div class="rf-modal__content">
                            <h1 id="rf-modal-title-modal-2" class="rf-modal__title">Se connecter</h1>
                            <label class="rf-label" for="text-input-text">Email</label>
                            <input class="rf-input" bind:value={inputEmail} type="email" placeholder="perrine@commune.fr" autocomplete="email" name="urbanvitaliz-email">
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
                </div>
            </div>
        </div>
    </div>
</dialog>

<style>
    dialog .rf-modal__header button{
        min-width: initial;
    }

    dialog .rf-modal__content{
        text-align: left;
    }
</style>
