const mongoose = require('mongoose');
require('dotenv').config();

// Reuse the DB connection
let conn = null;

// Pet schema
const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }
});
const Pet = mongoose.models.Pet || mongoose.model('Pet', petSchema);

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true }
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Get all pets
module.exports.getPets = async () => {
  try {
    if (!conn) {
      conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }

    const pets = await Pet.find({}).lean();
    return {
      statusCode: 200,
      body: JSON.stringify(pets),
    };
  } catch (error) {
    console.error('Error fetching pets:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error: error.message })
    };
  }
};

// Create a new pet
module.exports.createPet = async (event) => {
  try {
    if (!conn) {
      conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }

    const data = JSON.parse(event.body);
    const newPet = await Pet.create(data);

    return {
      statusCode: 201,
      body: JSON.stringify(newPet),
    };
  } catch (error) {
    console.error('Error creating pet:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error: error.message })
    };
  }
};

// Get all users
module.exports.getUsers = async () => {
  try {
    if (!conn) {
      conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }

    const users = await User.find({}).lean();
    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error: error.message })
    };
  }
};

// Create a new user
module.exports.createUser = async (event) => {
  try {
    if (!conn) {
      conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }

    const data = JSON.parse(event.body);
    const newUser = await User.create(data);

    return {
      statusCode: 201,
      body: JSON.stringify(newUser),
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error: error.message })
    };
  }
};
