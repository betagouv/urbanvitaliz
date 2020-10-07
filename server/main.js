import express from 'express'
import compression from 'compression'
import cors from 'cors'

import database from '../database/main.js'

const port = process.env.PORT

const app = express()

app.use(cors()) // enable CORS
app.use(compression()) // enable compression

app.use(express.raw())  
app.use(express.json())

const FRICHES_ROUTE_PATH = '/friches'

app.post('/login-by-email', (req, res) => {
    const {email} = req.query;
    console.log('/login-by-email', email)

    database.getOrCreateFricheCollectionByEmail(email)
    .then(fricheCollection => {
        res.redirect(303, `${req.protocol}://${req.get('Host')}${FRICHES_ROUTE_PATH}?secret=${fricheCollection._id}`)
    })
    .catch(err => res.status(500).send(`Some error (${req.path}): ${err}`))
})

app.get(FRICHES_ROUTE_PATH, (req, res) => {
    console.log(FRICHES_ROUTE_PATH, req.query)
    res.status(200).send(`TODO
        get FricheCollection secret
        get corresponding FricheCollection
        if found, send list with all friches data
        if not, 404
    `)
})

app.get('/friche', (req, res) => {
    res.status(404).send(`TODO
        get Friche secret
        get corresponding Friche
        if found, send all data for this friche
        if not, 404
    `)
    
})



/*
app.post('/first-use', (req, res) => {    
    if(storage.size === 0){
        const origin = `${req.protocol}://${req.get('Host')}`
        const importData = req.body.length >= 2 ? JSON.parse(req.body.toString()) : undefined;

        res.status(201)
            .set('Location', initBundle.store.add)
            .json(initBundle)
    }
    else{
        res.status(410).end()
    }
})

app.all('*', (req, res) => {
    const key = req.path.slice(1); // strip initial '/'

    console.log('persisturl server receiving key', key)

    
})*/


const server = app.listen(port, () => {
    const {port} = server.address()
    console.log(`App listening on port ${port}!`)

    if(process.send){
        process.send({origin: `http://localhost:${port}`})
    }
})