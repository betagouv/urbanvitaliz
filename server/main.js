//@ts-check

import express from 'express'
import compression from 'compression'
import cors from 'cors'

import * as database from '../database/main.js'

const port = process.env.PORT || 4999

const app = express()

// Express configuration

app.use(cors()) // enable CORS
app.use(compression()) // enable compression

app.use(express.raw())
app.use(express.json())

// ROUTES

function makeReturningCapabilityURL(req, path, secret){
    return `${req.get('X-Forwarded-Proto') || req.protocol}://${req.get('Host')}${path}?secret=${secret}`
}

const MES_RESSOURCES_ROUTE_PATH = `/mes-ressources`

app.post('/login-by-email', (req, res) => {
    const {email} = req.query;
    console.log('/login-by-email', email)

    database.getOrCreateRessourcesByEmail(email)
    .then((result) => {
        const newUser = result.newUser;
        const person = result.person;
        const ressourceCollection = result.ressourceCollection;
        res.status(newUser ? 201 : 200).send({person, ressourceCollection})
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