import mongodbpackage from "mongodb"
import constants from "./constants.cjs"
import makeCapabilityString from "../server/random-cap.js"
import { async } from "crypto-random-string"

const { MongoClient, ObjectID } = mongodbpackage
const {DATABASE_NAME, MONGO_URL, COLLECTIONS: {PERSONS, RESSOURCE_COLLECTIONS}} = constants

const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });

await client.connect();

const database = client.db(DATABASE_NAME);

const [persons, ressource_collections] = await Promise.all([PERSONS, RESSOURCE_COLLECTIONS].map(name => database.collection(name)))


export async function getOrCreateRessourcesByEmail(email){
    let person = await persons.findOne({emails: email})

    console.log('found person', person)

    let newUser = false;

    if(!person){
        const {ops} = await persons.insertOne({emails: [email]})
        person = ops[0]
        console.log('inserted person', person)
        newUser = true;
    }

    let thisPersonsRessourceCollection = await ressource_collections.findOne({created_by: ObjectID(person._id)})

    if(!thisPersonsRessourceCollection){
        const {ops} = await ressource_collections.insertOne({created_by: ObjectID(person._id), ressources_ids: [] , edit_capability: makeCapabilityString()})
        thisPersonsRessourceCollection = ops[0]
        console.log('inserted thisPersonsRessourceCollection', thisPersonsRessourceCollection)
    }

    return {
        ressourceCollection: thisPersonsRessourceCollection,
        newUser,
        person
    }
}

export async function addResourceToCollection(resourceId, edit_capability){
    await ressource_collections.updateOne({edit_capability}, {$addToSet: {ressources_ids: resourceId}})
}

export async function removeResourceFromCollection(resourceId, edit_capability){
    await ressource_collections.updateOne({edit_capability}, {$pull: {ressources_ids: resourceId}})
}

export async function getResourceCollection(edit_capability){
    return await ressource_collections.findOne({edit_capability});
}

export async function getAllPersons(){
    return await persons.find().toArray();
}

export async function addRecommendation({personId, ressourceId, message}){
    return ressource_collections.updateOne(
        {created_by: ObjectID(personId)}, 
        {$push: {recommendations: {ressourceId, message}}}
    )
}