import {json} from 'd3-fetch';

import LoginByEmail from './components/LoginByEmail.svelte';
import randomCap from './randomCap.js';
import SERVER_ORIGIN from './serverOrigin.js';

export default function(onLogin) {
    const loginByEmail = new LoginByEmail({
        target: document.querySelector("header .rf-shortcuts__item"),
        props: {}
    });

    loginByEmail.$on('email', event => {
        const email = event.detail;
        
        const randomSecret = randomCap({length: 20, type: 'url-safe'});
        json(`${SERVER_ORIGIN}/login-by-email?email=${email}&secret=${randomSecret}`, {method: 'POST'})
        // @ts-ignore
        .then(({person}) => {
            const closeButton = document.querySelector('dialog#rf-modal-login button[aria-controls="rf-modal-login"].rf-link--close')
            // @ts-ignore
            closeButton.click();
            loginByEmail.$set({person});
            onLogin({person});
        })
        .catch(res => console.error('error fetch email', res))
    });

    return function setPerson(person){
        loginByEmail.$set({person});
    }
}
