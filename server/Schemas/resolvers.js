const { User, Pet } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
       me: async (parent, args, context) => {
           if(context.user) {
               const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password').populate('savedPets')
                
                return userData;
           }
           throw new AuthenticationError('You are not logged in!')
       },
       user: async (parent, { username}) => {
           return User.findOne({ username })
            .select('-__v -password')
       },
       getPet: async () => {
        return Pet.find({}); 
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError ('Incorrect Credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        savePet: async (parent,  { savedPet }, context) => {
           
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedPets: savedPet } },
                    { new: true, runValidators: true }
                );
                const populatedUser = await User.findOne({ _id: context.user._id }).populate('savedPets')
                return populatedUser
            }
            throw new AuthenticationError('You need to be logged in!')
        },

        removePet: async (parent, { _id }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedPets:  _id  } },
                    { new: true } 
                );

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in! ')
        }
    }
}

module.exports = resolvers;