const db = require('../config/connection');
const { User, Interest } = require('../models');
const userSeeds = require('./userSeeds.json');
const interestSeeds = require('./interestSeeds.json')


db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);

    await Interest.deleteMany({});
    await Interest.create(interestSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
