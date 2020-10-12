import {json} from 'd3-fetch';

import LoginByEmail from './components/LoginByEmail.svelte';
import FricheCollection from './components/FricheCollection.svelte';
import FricheForm from './components/FricheForm.svelte';

const SERVER_ORIGIN = `http://localhost:4999`

const svelteTarget = document.querySelector('.svelte-main')

const loginByEmail = new LoginByEmail({
    target: svelteTarget,
    props: {}
});

loginByEmail.$on('email', event => {
    const email = event.detail;
    
    json(`${SERVER_ORIGIN}/login-by-email?email=${email}`, {method: 'POST'})
    // TODO bug here, there is no 'friches' prop returned
    // set up types to catch it
    .then(({friches, fricheCollectionCap}) => {
        console.log('fetch email', fricheCollectionCap)

        console.log('FAKE REDIRECT', '/friches')

        json(fricheCollectionCap)
        .then(({friches, fricheCollectionEditCap}) => {
            loginByEmail.$destroy()

            const fricheCollectionComponent = new FricheCollection({
                target: svelteTarget,
                props: {
                    email,
                    friches,
                    onAddFriche: fricheCollectionEditCap ? () => {
                        fricheCollectionComponent.$destroy()

                        console.log('FAKE REDIRECT', '/friche-form')

                        const fricheFormComponent = new FricheForm({
                            target: svelteTarget,
                            props: {}
                        });

                        fricheFormComponent.$on('new-friche', event => {
                            const friche = event.detail;

                            console.log('new friche', friche)

                            json(fricheCollectionEditCap, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(friche)
                            })
                            .then(() => {
                                friches.push(friche)

                                fricheFormComponent.$destroy()

                                console.log('FAKE REDIRECT', '/friches')

                                const fricheCollectionComponent = new FricheCollection({
                                    target: svelteTarget,
                                    props: {
                                        email,
                                        friches
                                    }
                                })
                            })
                            .catch(err => console.error('error', err))

                        })
                    } : undefined
                }
            });
        })

    })
    .catch(res => console.error('error fetch email', res))
});