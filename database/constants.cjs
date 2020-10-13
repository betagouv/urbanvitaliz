
module.exports = {
    COLLECTIONS: Object.freeze({
        PERSONS: 'persons',
        FRICHES_COLLECTIONS: 'friches_collection',
        FRICHES: 'friches',
    }),
    DATABASE_NAME: "urban_vitaliz",
    MONGO_URL: process.env.MONGODB_ADDON_URI || `mongodb://127.0.0.1:27017`
}