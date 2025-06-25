const mongoose = require("mongoose");
require("dotenv").config();

let conn = null;

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
});

const Pet = mongoose.models.Pet || mongoose.model("Pet", petSchema);

module.exports.getPets = async (event) => {
  try {
    if (!conn) {
      conn = await mongoose.connect(process.env.MONGODB_URI);
    }

    const pets = await Pet.find({}).lean();
    return {
      statusCode: 200,
      body: JSON.stringify(pets),
    };
  } catch (error) {
    console.error("Error fetching pets:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
    };
  }
};

module.exports.createPet = async (event) => {
  try {
    if (!conn) {
      conn = await mongoose.connect(process.env.MONGODB_URI);
    }

    const data = JSON.parse(event.body);
    const newPet = await Pet.create(data);

    return {
      statusCode: 201,
      body: JSON.stringify(newPet),
    };
  } catch (error) {
    console.error("Error creating pet:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
    };
  }
};
