import {json} from 'd3-fetch';

import LoginByEmail from './components/LoginByEmail.svelte';
import FricheCollection from './components/FricheCollection.svelte';

const SERVER_ORIGIN = `http://localhost:4999`

const svelteTarget = document.querySelector('.svelte-main')

const loginByEmail = new LoginByEmail({
    target: svelteTarget,
    props: {}
});

loginByEmail.$on('email', event => {
    const email = event.detail;
    
    json(`${SERVER_ORIGIN}/login-by-email?email=${email}`, {method: 'POST'})
    .then(({friches, fricheCollectionCap}) => {
        console.log('fetch email', fricheCollectionCap)

        console.log('FAKE REDIRECT', '/friches')

        json(fricheCollectionCap)
        .then(({friches}) => {
            loginByEmail.$destroy()

            throw `TODO
                - utiliser la fricheCollectionEditCap pour générer le onAddFriche
                - Quand on clique sur ce bouton, ça génère un composant FricheForm
                - Le "valider" de ce bouton génère une nouvelle friche
            `

            const fricheCollectionComponent = new FricheCollection({
                target: svelteTarget,
                props: {
                    email,
                    friches,
                    onAddFriche: true
                }
            });
        })

    })
    .catch(res => console.error('error fetch email', res))
});