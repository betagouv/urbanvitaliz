import LoginByEmail from './components/LoginByEmail.svelte';

const SERVER_ORIGIN = `http://localhost:4999`

const loginByEmail = new LoginByEmail({
    target: document.querySelector('.svelte-main'),
    props: {}
});

loginByEmail.$on('email', event => {
    const email = event.detail;
    
    fetch(`${SERVER_ORIGIN}/login-by-email?email=${email}`, {method: 'POST'})
    .then(res => ({url: res.url, body: res.text()}))
    .then(res => console.log('fetch email', res))
    .catch(res => console.error('error fetch email', res))
});