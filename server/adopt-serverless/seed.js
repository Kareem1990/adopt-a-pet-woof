const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Pet = require('./models/Pet');
const pets = require('./petseeds.json'); // Make sure this is in the same directory

dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🟢 Connected to MongoDB');

    await Pet.deleteMany();
    console.log('🧹 Existing pets wiped');

    await Pet.insertMany(pets);
    console.log(`✅ Seeded pet data: ${pets.length} entries`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seedDatabase();
