import mongodbpackage from "mongodb"

const { MongoClient } = mongodbpackage
const mongourl = `mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb`

const DATABASE_NAME = "urban_vitaliz";
const PERSONS_COLLECTION_NAME = 'Persons';

const client = new MongoClient(mongourl);

await client.connect();

const database = client.db(DATABASE_NAME);
const colls = await database.collections();

console.log('colls', colls.map(c => c.collectionName))
if(!colls.find(c => c.collectionName === PERSONS_COLLECTION_NAME))
    await database.createCollection(PERSONS_COLLECTION_NAME)
else 
    console.log('already a collection named', PERSONS_COLLECTION_NAME)

const colls2 = await database.collections();

console.log('colls2', colls2.map(c => c.collectionName))

await client.close();


export default {
    getOrCreateFricheCollectionIdByEmail(email){




        return Promise.reject(`TODO
            - get email from Person collection
            - if found
                - lookup id in FricheCollection collection
                - return FricheCollection id
            - if not found
                - create Person with this email
                - create FricheCollection with created_by as this Person's _id
                - return corresponding FricheCollection id
        `)
    }
}