// @ts-check
import mongodbpackage from "mongodb"
import constants from "./constants.cjs"
import makeCapabilityString from "../server/random-cap.js"
import "./types.js"

const { MongoClient, ObjectID } = mongodbpackage
const {DATABASE_NAME, MONGO_URL, COLLECTIONS: {PERSONS, RESSOURCE_COLLECTIONS}} = constants

const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });

await client.connect();

const database = client.db(DATABASE_NAME);

const [persons, ressource_collections] = await Promise.all([PERSONS, RESSOURCE_COLLECTIONS].map(name => database.collection(name)))




/**
 * @param {string} email
 * @param {string} optionalFirstAccessCapability
 * @return {Promise<{
 *  newUser: boolean
 *  person: MongoPerson
 * }>}
 */
export async function getOrCreatePersonByEmail(email, optionalFirstAccessCapability){
    /** @type {MongoPerson} */
    let person = await persons.findOne({emails: email})

    console.log('found person', person)

    let newUser = false;

    if(!person){
        /** @type {Partial<MongoPerson>} */
        const personData = {emails: [email], firstAccessCapability: optionalFirstAccessCapability};
        const {ops} = await persons.insertOne(personData)
        person = ops[0]
        console.log('inserted person', person)
        newUser = true;
    }

    if(!person.firstAccessCapability){
        await persons.updateOne({emails: email}, { $set: {firstAccessCapability: optionalFirstAccessCapability}})
        person.firstAccessCapability = optionalFirstAccessCapability;
    }

    let thisPersonsRessourceCollection = await ressource_collections.findOne({created_by: new ObjectID(person._id)})

    if(!thisPersonsRessourceCollection){
        const {ops} = await ressource_collections.insertOne({created_by: new ObjectID(person._id), ressources_ids: [] , edit_capability: makeCapabilityString()})
        thisPersonsRessourceCollection = ops[0]
        console.log('inserted thisPersonsRessourceCollection', thisPersonsRessourceCollection)
    }

    return {
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

/**
 * @returns {Promise<MongoPerson[]>} 
 */
export async function getAllPersons(){
    return await persons.find().toArray();
}

/**
 * 
 * @param {string} firstAccessCapability
 * @return {Promise<{
 *  person: MongoPerson
 *  ressourceCollection: any
 * }>}
 */
export async function getPersonAndTheirRessourceCollection(firstAccessCapability){
    /** @type {MongoPerson} */
    const person = await persons.findOne({firstAccessCapability})
    const ressourceCollection =  await ressource_collections.findOne({created_by: person._id});
    return {person, ressourceCollection}
}

export async function addRecommendation({personId, ressourceId, message}){
    return ressource_collections.updateOne(
        {created_by: new ObjectID(personId)}, 
        {$push: {recommendations: {ressourceId, message}}}
    )
}