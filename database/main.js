import mongodbpackage from "mongodb"
import constants from "./constants.cjs"
import makeCapString from "../server/random-cap.js"

const { MongoClient } = mongodbpackage
const {DATABASE_NAME, MONGO_URL, COLLECTIONS: {PERSONS, FRICHES_COLLECTIONS, FRICHES}} = constants

const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });

await client.connect();

const database = client.db(DATABASE_NAME);


export default {
    async getOrCreateFricheCollectionByEmail(email){
        const [persons, friches_collections] = await Promise.all([PERSONS, FRICHES_COLLECTIONS].map(name => database.collection(name)))
        let person = await persons.findOne({emails: email})

        console.log('found person', person)

        if(!person){
            const {ops} = await persons.insertOne({emails: [email]})
            person = ops[0]
            console.log('inserted person', person)
        }

        let thisPersonsFricheCollection = await friches_collections.findOne({created_by: person._id})

        if(!thisPersonsFricheCollection){
            const {ops} = await friches_collections.insertOne({created_by: person._id, friche_ids: [], edit_cap: makeCapString()})
            thisPersonsFricheCollection = ops[0]
            console.log('inserted thisPersonsFricheCollection', thisPersonsFricheCollection)
        }

        return thisPersonsFricheCollection
    }
}