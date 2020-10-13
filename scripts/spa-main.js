import {json} from 'd3-fetch';
import page from 'page'

import LoginByEmail from './components/LoginByEmail.svelte';
import FricheCollection from './components/FricheCollection.svelte';
import FricheForm from './components/FricheForm.svelte';

const isProduction = location.hostname === 'betagouv.github.io'
const SERVER_ORIGIN = isProduction ? 
    'https://app-f92a129e-7c5e-4922-97ab-66be747554dd.cleverapps.io' :
    `http://localhost:4999`

console.log('API server origin:', SERVER_ORIGIN)

const FRICHE_COLLECTION_API_ROUTE_PATH = '/collection-friche'
const COLLECTION_FRICHE_UI_PATH = '/collection-friche'


const svelteTarget = document.querySelector('.svelte-main')

let currentComponent;

function replaceComponent(newComponent){
    if(currentComponent)
        currentComponent.$destroy()
    
    currentComponent = newComponent
}

const state = {
    collectionFriches : [],
    lastCollectionFricheURL: undefined,
    lastFricheCollectionEditCap: undefined,
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
        // TODO bug here, there is no 'friches' prop returned
        // set up types to catch it
        .then(({friches, collectionFricheCap}) => {
            console.log('fetch email', collectionFricheCap)
            state.currentEmail = email;
    
            const url = new URL(collectionFricheCap);
            page(`${COLLECTION_FRICHE_UI_PATH}?secret=${url.searchParams.get('secret')}`)
        })
        .catch(res => console.error('error fetch email', res))
    });

    replaceComponent(loginByEmail)
})

page(COLLECTION_FRICHE_UI_PATH, ({querystring, path}) => {
    console.log('ROUTER', path)
    const q = new URLSearchParams(querystring)
    const secret = q.get('secret')

    const collectionFricheCap = `${SERVER_ORIGIN}${FRICHE_COLLECTION_API_ROUTE_PATH}?secret=${secret}`

    json(collectionFricheCap)
    .then(({friches, fricheCollectionEditCap}) => {
        const fricheCollectionComponent = new FricheCollection({
            target: svelteTarget,
            props: {
                email: state.currentEmail,
                friches,
                onAddFriche: fricheCollectionEditCap ? () => {
                    const {searchParams} = new URL(fricheCollectionEditCap);
                    page(`/friche-form?secret=${searchParams.get('secret')}`)
                } : undefined
            }
        });
        state.lastCollectionFricheURL = path;
        state.collectionFriches = friches
        state.lastFricheCollectionEditCap = fricheCollectionEditCap;

        replaceComponent(fricheCollectionComponent)
    })
})


page('/friche-form', ({path}) => {
    console.log('ROUTER', path)
    const fricheFormComponent = new FricheForm({
        target: svelteTarget,
        props: {}
    });

    fricheFormComponent.$on('new-friche', event => {
        const friche = event.detail;

        console.log('new friche', friche)

        json(state.lastFricheCollectionEditCap, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(friche)
        })
        .then(() => {
            page(state.lastCollectionFricheURL)
        })
        .catch(err => console.error('error', err))
    })

    replaceComponent(fricheFormComponent)
})

page.start()