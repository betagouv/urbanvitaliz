import {json} from 'd3-fetch';

import LoginByEmail from './components/LoginByEmail.svelte';
import randomCap from './randomCap';
import SERVER_ORIGIN from './serverOrigin';

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
        .then(({person, ressourceCollection}) => {
            const closeButton = document.querySelector('dialog#rf-modal-login button[aria-controls="rf-modal-login"].rf-link--close')
            // @ts-ignore
            closeButton.click();
            loginByEmail.$set({person});
            onLogin({person, ressourceCollection});
        })
        .catch(res => console.error('error fetch email', res))
    });
    
}
