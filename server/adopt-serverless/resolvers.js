const { Pet, User } = require('./models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('./utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedPets');
        return userData;
      }
      throw new AuthenticationError('You are not logged in!');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).select('-__v -password');
    },
    getPet: async () => {
      try {
        console.log('🐾 Fetching pets from MongoDB');
        const pets = await Pet.find();
        return pets;
      } catch (err) {
        console.error('❌ Failed to fetch pets:', err.message);
        throw new Error('Failed to fetch pets');
      }
    }
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    savePet: async (parent, { savedPet }, context) => {
      if (!context.user) throw new AuthenticationError('You need to be logged in!');
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedPets: savedPet } },
        { new: true, runValidators: true }
      );
      return User.findById(context.user._id).populate('savedPets');
    },
    removePet: async (parent, { _id }, context) => {
      if (!context.user) throw new AuthenticationError('You need to be logged in!');
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedPets: _id } },
        { new: true }
      );
    }
  }
};

module.exports = resolvers;
