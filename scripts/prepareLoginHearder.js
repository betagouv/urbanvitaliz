import {json} from 'd3-fetch';

import LoginByEmail from './components/LoginByEmail.svelte';
import SERVER_ORIGIN from './serverOrigin';

export default function(onLogin) {
    const loginByEmail = new LoginByEmail({
        target: document.querySelector("dialog#rf-modal-login .rf-modal__body"),
    });

    loginByEmail.$on('email', event => {
        const email = event.detail;
        console.log("email:", email);
        
        json(`${SERVER_ORIGIN}/login-by-email?email=${email}`, {method: 'POST'})
        // @ts-ignore
        .then(({person, ressourceCollection}) => {
            const closeButton = document.querySelector('dialog#rf-modal-login button[aria-controls="rf-modal-login"].rf-link--close')
            // @ts-ignore
            closeButton.click();
            onLogin({person, ressourceCollection});
        })
        .catch(res => console.error('error fetch email', res))
    });
}
