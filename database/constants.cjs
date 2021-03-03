
module.exports = {
    COLLECTIONS: Object.freeze({
        PERSONS: 'persons',
        RESSOURCE_COLLECTIONS: 'ressource_collections'
    }),
    DATABASE_NAME: process.env.MONGODB_ADDON_DB || "urban_vitaliz",
    MONGO_URL: process.env.MONGODB_ADDON_URI || `mongodb://127.0.0.1:27017`
}