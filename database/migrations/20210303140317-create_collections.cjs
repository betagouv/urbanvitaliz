const {COLLECTIONS: {PERSONS, RESSOURCE_COLLECTIONS}} = require('../constants.cjs')

module.exports = {
  async up(db, client) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await Promise.all([PERSONS, RESSOURCE_COLLECTIONS].map(name => db.createCollection(name)))
      });
    } finally {
      await session.endSession();
    }
  },

  async down(db, client) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await Promise.all([PERSONS, RESSOURCE_COLLECTIONS].map(name => db.dropCollection(name)))
      });
    } finally {
      await session.endSession();
    }
  }
};
