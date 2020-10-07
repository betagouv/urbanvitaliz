// config in CommonJS format, because migrate-mongo is not ready for ESM
// https://github.com/seppevs/migrate-mongo/issues/248

const {DATABASE_NAME, MONGO_URL} = require('./constants.cjs')

console.log('import DATABASE_NAME, MONGO_URL', DATABASE_NAME, MONGO_URL)

const config = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url: MONGO_URL,

    // TODO Change this to your database name:
    databaseName: DATABASE_NAME,

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: "./database/migrations",

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "_migrations_changelog",

  // The file extension to create migrations and search for in migration dir 
  // .cjs, because migrate-mongo is not ready for ESM
  // https://github.com/seppevs/migrate-mongo/issues/248
  migrationFileExtension: ".cjs"
};

module.exports = config;
