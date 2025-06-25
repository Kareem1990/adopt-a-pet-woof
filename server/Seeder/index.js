const db = require('../config/connection');
const { User, Pet } = require('../models');
const petseeds = require('./petseeds.json');


db.once('open', async () => {
  try {
    console.log('syncing', '='.repeat(50))
    await Pet.deleteMany({});
    console.log('deleted', '='.repeat(50))
    // await User.deleteMany({});
    await Pet.create(petseeds);
    // await User.create(userSeeds);

    // for (let i = 0; i < thoughtSeeds.length; i++) {
    //   const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
    //   const user = await User.findOneAndUpdate(
    //     { username: thoughtAuthor },
    //     {
    //       $addToSet: {
    //         thoughts: _id,
    //       },
    //     }
    //   );
    // }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
