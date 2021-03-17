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



// ROUTES

app.post('/login-by-email', (req, res) => {
    const {email} = req.query;
    console.log('/login-by-email', email)

    database.getOrCreateRessourcesByEmail(email)
    .then((result) => {
        const newUser = result.newUser;
        const person = result.person;
        const {edit_capability, ressources_ids} = result.ressourceCollection;
        res.status(newUser ? 201 : 200).send({
            person, 
            ressourceCollection: {
                edit_capability: makeReturningCapabilityURL(req, LISTE_RESSOURCES_ROUTE, edit_capability), 
                ressources_ids
            }
        })
    })
    .catch(err => res.status(500).send(`Some error (${req.path}): ${err}`))
})

app.get(LISTE_RESSOURCES_ROUTE, (req, res) => {
    const edit_capability = req.query.secret;

    database.getResourceCollection(edit_capability)
    .then((ressourceCollection) => {
        res.status(200).send({
            edit_capability: makeReturningCapabilityURL(req, LISTE_RESSOURCES_ROUTE, ressourceCollection.edit_capability),
            ressources_ids: ressourceCollection.ressources_ids
        });
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

app.get('/person-emails', (req, res) =>{
    database.getAllPersonEmails()
    .then((emails) => {
        console.log("emails :", emails)
        res.status(200).send(emails);
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