const {COLLECTIONS: {PERSONS, FRICHES_COLLECTIONS, FRICHES}} = require('../constants.cjs')

module.exports = {
  async up(db, client) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await Promise.all([PERSONS, FRICHES_COLLECTIONS, FRICHES].map(name => db.createCollection(name)))
      });
    } finally {
      await session.endSession();
    }
  },

  async down(db, client) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await Promise.all([PERSONS, FRICHES_COLLECTIONS, FRICHES].map(name => db.dropCollection(name)))
      });
    } finally {
      await session.endSession();
    }
  }
};
