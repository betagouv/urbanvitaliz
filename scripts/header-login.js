import {json} from 'd3-fetch';

import makeBookmarkListURLFromRessourceCollection from './makeBookmarkListURLFromRessourceCollection';
import LoginByEmail from './components/LoginByEmail.svelte';
import SERVER_ORIGIN from './serverOrigin';

console.log("BONJOIR 🦄 ")

const loginByEmail = new LoginByEmail({
    target: document.querySelector("dialog#rf-modal-login .rf-modal__body"),
    props: {}
});

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