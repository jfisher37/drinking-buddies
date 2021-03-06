const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String!
    email: String!
    password: String!
    drink_level: [Int]
    price_range: [Int]
    interests: [Interest]
    drinking_buddies: [User]
    creation_date: String
  }

  type Interest {
    _id: ID
    name: String!
    popularity: Int
    created_by: User
    creation_date: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
   interests: [Interest]
   interest(_id: ID!): Interest
   users: [User]
   user(_id: ID!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(name: String!, email: String!, password: String!): Auth
    updateUserInfo(_id: ID!, name: String!, email: String!, password: String!): User
    addUserInterest(_id: ID!, interest: ID!): User
    deleteUserInterest(_id: ID!, interest: ID!): User
    addDrinkingBuddy(_id: ID!, drinking_buddy: ID!): User
    deleteDrinkingBuddy(_id: ID!, drinking_buddy: ID!): User
    addPriceRange(_id: ID!, price_range: Int): User
    deletePriceRange(_id: ID!, price_range: Int): User
    addDrinkLevel(_id: ID!, drink_level: Int): User
    deleteDrinkLevel(_id: ID!, drink_level: Int): User
    deleteUser(_id: ID!): User
    addInterest(name: String!, user: ID!): Interest
    deleteInterest(_id: ID!): Interest
    updateInterest(_id: ID!, name: String!): Interest
    incPopularity(_id: ID!): Interest
    decPopularity(_id: ID!): Interest
  }
`;

module.exports = typeDefs;
