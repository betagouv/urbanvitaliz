//@ts-check

import express from 'express'
import compression from 'compression'
import cors from 'cors'

import * as database from '../database/main.js'

import {LISTE_RESSOURCES_ROUTE} from '../shared/routes.js'

const port = process.env.PORT || 4999

const app = express()

// Express configuration

app.use(cors()) // enable CORS
app.use(compression()) // enable compression

app.use(express.raw())
app.use(express.json())


function makeReturningCapabilityURL(req, path, secret){
    return `${req.get('X-Forwarded-Proto') || req.protocol}://${req.get('Host')}${path}?secret=${secret}`
}

function makeClientSideRessourceCollection(databaseRessourceCollection, req){
    const {edit_capability, ressources_ids, recommendations} = databaseRessourceCollection;
    
    return {
        edit_capability: makeReturningCapabilityURL(req, LISTE_RESSOURCES_ROUTE, edit_capability), 
        ressources_ids,
        recommendations
    }
}

// ROUTES

app.post('/login-by-email', (req, response) => {
    const {email, secret} = req.query;
    console.log('/login-by-email', email);
    console.log('secret:', secret)

    database.getOrCreateRessourcesByEmail(email, secret)
    .then((result) => {
        const newUser = result.newUser;
        const person = result.person;
        response.status(newUser ? 201 : 200).send({
            person, 
            ressourceCollection: makeClientSideRessourceCollection(result.ressourceCollection, req)
        })
    })
    .catch(err => response.status(500).send(`Some error (${req.path}): ${err}`))
        
})

app.get(LISTE_RESSOURCES_ROUTE, (req, res) => {
    const edit_capability = req.query.secret;

    database.getResourceCollection(edit_capability)
    .then((ressourceCollection) => {
        res.status(200).send( makeClientSideRessourceCollection(ressourceCollection, req) );
    })
    .catch(err => res.status(500).send(`Some error (${req.path}): ${err}`))
})

app.patch(LISTE_RESSOURCES_ROUTE, (req, res) => {
    const edit_capability = req.query.secret;
    const {add, delete: _delete} = req.body

    Promise.all([
        add ? database.addResourceToCollection(add, edit_capability) : Promise.resolve(),
        _delete ? database.removeResourceFromCollection(_delete, edit_capability) : Promise.resolve(),
    ])
    .then(() => {
        res.status(204).end();
    })
    .catch(err => res.status(500).send(`Some error (${req.path}): ${err}`))
})

app.get('/persons', (req, res) =>{
    database.getAllPersons()
    .then(persons => {
        console.log("persons :", persons)
        res.status(200).send(persons);
    })
    .catch(err => res.status(500).send(`Some error (${req.path}): ${err}`))
})

app.get('/first-access', (req, res) =>{
    const firstAccessCapability = req.query.secret;
    
    database.getPersonAndTheirRessourceCollection(firstAccessCapability)
    .then((personAndRessourceCollection)=> {
        const person = personAndRessourceCollection.person;
        const ressourceCollection = personAndRessourceCollection.ressourceCollection;
        
        console.log("person:", personAndRessourceCollection)
        res.status(200).send({person, ressourceCollection});
    })
    .catch(err => res.status(500).send(`Some error (${req.path}): ${err}`))
})

app.post('/recommend', (req, res) =>{
    const {personId, ressourceId, message} = req.body

    database.addRecommendation({personId, ressourceId, message})
    .then(persons => {
        console.log("persons :", persons)
        res.status(200).send(persons);
    })
    .catch(err => res.status(500).send(`Some error (${req.path}): ${err}`))
})

const server = app.listen(port, () => {
    // @ts-ignore
    const {port} = server.address()
    console.log(`App listening on port ${port}!`)

    if(process.send){
        process.send({origin: `http://localhost:${port}`})
    }
})