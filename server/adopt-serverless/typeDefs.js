const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Pet {
    _id: ID
    owner: String
    description: String
    image: String
    title: String
    name: String
    type: String
  }

  type User {
    _id: ID
    username: String
    email: String
    savedPets: [Pet]
    petCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String!): User
    getPet: [Pet]  # ✅ this is the fix that aligns with your frontend's GET_PET query
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    savePet(savedPet: ID!): User
    removePet(_id: ID!): User
  }
`;

module.exports = typeDefs;
