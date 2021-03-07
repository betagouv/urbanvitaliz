import {json} from 'd3-fetch';
import page from 'page'

import LoginByEmail from './components/LoginByEmail.svelte';

const isProduction = location.hostname === 'betagouv.github.io'
const SERVER_ORIGIN = isProduction ? 
    'https://app-f92a129e-7c5e-4922-97ab-66be747554dd.cleverapps.io' :
    `http://localhost:4999`

console.log('API server origin:', SERVER_ORIGIN)

const svelteTarget = document.querySelector('.svelte-main')

let currentComponent;

function replaceComponent(newComponent){
    if(currentComponent)
        currentComponent.$destroy()
    
    currentComponent = newComponent
}

const state = {
    currentEmail: undefined
}

page.base(location.origin.includes('betagouv.github.io') ? '/urbanvitaliz' : '')

console.log('page.base', page.base())

page('/login-by-email', ({path}) => {
    console.log('ROUTER', path)
    const loginByEmail = new LoginByEmail({
        target: svelteTarget,
        props: {}
    });

    loginByEmail.$on('email', event => {
        const email = event.detail;
        
        json(`${SERVER_ORIGIN}/login-by-email?email=${email}`, {method: 'POST'})
        .then(({person, ressourceCollection}) => {
            console.log('login succesful', person, ressourceCollection)
            // state.currentEmail = email;
    
            // const url = new URL(collectionFricheCap);
            // page(`${COLLECTION_FRICHE_UI_PATH}?secret=${url.searchParams.get('secret')}`)
        })
        .catch(res => console.error('error fetch email', res))
    });

    replaceComponent(loginByEmail)
})

page.start()