const mongoose = require('mongoose');
require('dotenv').config();

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

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
};

// Preflight response
const preflight = {
  statusCode: 200,
  headers: corsHeaders,
  body: ""
};

// Helper to connect to Mongo
const connectToDB = async () => {
  if (!conn) {
    conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
};

// Get all pets
module.exports.getPets = async (event) => {
  if (event.httpMethod === "OPTIONS") return preflight;

  try {
    await connectToDB();
    const pets = await Pet.find({}).lean();
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(pets),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

// Create new pet
module.exports.createPet = async (event) => {
  if (event.httpMethod === "OPTIONS") return preflight;

  try {
    await connectToDB();
    const data = JSON.parse(event.body);
    const newPet = await Pet.create(data);

    return {
      statusCode: 201,
      headers: corsHeaders,
      body: JSON.stringify(newPet),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

// Get all users
module.exports.getUsers = async (event) => {
  if (event.httpMethod === "OPTIONS") return preflight;

  try {
    await connectToDB();
    const users = await User.find({}).lean();

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(users),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

// Create new user
module.exports.createUser = async (event) => {
  if (event.httpMethod === "OPTIONS") return preflight;

  try {
    await connectToDB();
    const data = JSON.parse(event.body);
    const newUser = await User.create(data);

    return {
      statusCode: 201,
      headers: corsHeaders,
      body: JSON.stringify(newUser),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
