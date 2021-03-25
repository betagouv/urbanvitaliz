import {json} from 'd3-fetch';

import LoginByEmail from './components/LoginByEmail.svelte';
import {LISTE_RESSOURCES_ROUTE} from '../shared/routes.js';

const isProduction = location.hostname === 'betagouv.github.io'
const SERVER_ORIGIN = isProduction ? 
    'https://app-20420772-6ed7-40ca-978c-f360edf8941c.cleverapps.io' :
    `http://localhost:4999`

console.log('API server origin:', SERVER_ORIGIN)
console.log("BONJOIR 🦄 ")

const loginByEmail = new LoginByEmail({
    target: document.querySelector("dialog#rf-modal-login .rf-modal__body"),
    props: {}
});

function makeBookmarkListURLFromRessourceCollection(ressourceCollection) {
    const { edit_capability } = ressourceCollection;
    const editCapURL = new URL(edit_capability);
    return `${LISTE_RESSOURCES_ROUTE}?secret=${editCapURL.searchParams.get('secret')}`
}

loginByEmail.$on('email', event => {
    const email = event.detail;
    console.log("email:", email);
    
    json(`${SERVER_ORIGIN}/login-by-email?email=${email}`, {method: 'POST'})
    // @ts-ignore
    .then(({person, ressourceCollection}) => {
        console.log('login succesful', person, ressourceCollection)
        
        location.assign(makeBookmarkListURLFromRessourceCollection(ressourceCollection));
    
    })
    .catch(res => console.error('error fetch email', res))
});