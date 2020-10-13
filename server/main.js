import express from 'express'
import compression from 'compression'
import cors from 'cors'

import * as database from '../database/main.js'

const port = process.env.PORT

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


app.post('/login-by-email', (req, res) => {
    const {email} = req.query;
    console.log('/login-by-email', email)

    database.getOrCreateFricheCollectionByEmail(email)
    .then(({fricheCollection, newUser}) => {
        res.status(newUser ? 201 : 200).send({
            collectionFricheCap: makeReturningCapabilityURL(req, FRICHE_COLLECTION_ROUTE_PATH, fricheCollection._id)
        })
    })
    .catch(err => res.status(500).send(`Some error (${req.path}): ${err}`))
})

const FRICHE_COLLECTION_ROUTE_PATH = '/collection-friche'

app.get(FRICHE_COLLECTION_ROUTE_PATH, (req, res) => {
    console.log('GET', FRICHE_COLLECTION_ROUTE_PATH, req.query)

    database.getFricheCollection(req.query.secret)
    .then(({friches, edit_cap}) => {
        res.status(200).send({
            friches,
            fricheCollectionEditCap: makeReturningCapabilityURL(req, FRICHE_COLLECTION_ROUTE_PATH, edit_cap)
        })
    })
    .catch(err => res.status(500).send(`Some error (${req.path}): ${err}`))
})

app.post(FRICHE_COLLECTION_ROUTE_PATH, (req, res) => {
    console.log('POST', FRICHE_COLLECTION_ROUTE_PATH, req.query)

    const {secret: collection_edit_cap} = req.query;
    const {body: friche} = req;

    // TODO There is no data validation for now
    // will probably come later in the form of schema validation at the database level

    database.addFricheToCollection({
        collection_edit_cap,
        friche
    })
    .then(({_id}) => {
        res.status(201).send({
            friche: makeReturningCapabilityURL(req, FRICHE_ROUTE_PATH, _id)
        })
    })
    .catch(err => res.status(500).send(`Some error (${req.path}): ${err}`))
})

const FRICHE_ROUTE_PATH = '/friche'

app.get(FRICHE_ROUTE_PATH, (req, res) => {
    res.status(404).send(`TODO
        get Friche secret
        get corresponding Friche
        if found, send all data for this friche
        if not, 404
    `)
    
})


const server = app.listen(port, () => {
    const {port} = server.address()
    console.log(`App listening on port ${port}!`)

    if(process.send){
        process.send({origin: `http://localhost:${port}`})
    }
})