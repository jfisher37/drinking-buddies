const { AuthenticationError } = require("apollo-server-express");
const { User, Interest } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    // Query for all users
    users: async () => {
      return User.find();
    },

    // Query for one user
    user: async (parent, { _id }) => {
      return User.findById(_id);
    },

    // Query for all interests
    interests: async () => {
      return await Interest.find().sort({ popularity: -1 })
    },

    // Query for one interest
    interest: async (parent, { _id }) => {
      return await Interest.findById({ _id: _id });
    },
  },

  Mutation: {
    // Mutation to add an interest
    addInterest: async (parent, { name }) => {
      name = name.toLowerCase();
      const interest = await Interest.create({ name });
      return interest;
    },

    // Mutation to sign up
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = await signToken(user);
      console.log(token);
      return { user, token };
    },

    // Mutation to login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No profile with this email found!");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(user);
      console.log(user);
      return { token, user };
    },

    // Mutation to update views
    updateUserInfo: async (parent, { _id, name, email, password }) => {
      const saltRounds = 10;
      const newPassword = await bcrypt.hash(password, saltRounds);
      console.log(password)
      console.log(newPassword)
      const user = await User.findOneAndUpdate(
        { _id: _id },
        {
          name: name,
          email: email,
          password: newPassword,
        },
        {
          new: true,
        }
      );
      return user;
    },

    // Mutation to add an interest to a user
    addUserInterest: async (parent, { _id, interest }) => {
      const user = await User.findOneAndUpdate(
        { _id: _id },
        {
          $push: { interests: interest },
        },
        {
          new: true,
        }
      );
      return user;
    },

    // Mutation to delete an interest from a user
    deleteUserInterest: async (parent, { _id, interest }) => {
      const user = await User.findOneAndUpdate(
        { _id: _id },
        {
          $pull: { interests: interest },
        },
        {
          new: true,
        }
      );
      return user;
    },

    // Mutation to add a price-range to a user
    addPriceRange: async (parent, { _id, price_range }) => {
      const user = await User.findOneAndUpdate(
        { _id: _id },
        {
          $push: { price_range: price_range },
        },
        {
          new: true,
        }
      );
      return user;
    },

    // Mutation to delete a price-range from a user
    deletePriceRange: async (parent, { _id, price_range }) => {
      const user = await User.findOneAndUpdate(
        { _id: _id },
        {
          $pull: { price_range: price_range },
        },
        {
          new: true,
        }
      );
      return user;
    },

    // Mutation to add a drink-level to a user
    addDrinkLevel: async (parent, { _id, drink_level }) => {
      const user = await User.findOneAndUpdate(
        { _id: _id },
        {
          $push: { drink_level: drink_level },
        },
        {
          new: true,
        }
      );
      return user;
    },

    // Mutation to delete a drink-level to a user
    deleteDrinkLevel: async (parent, { _id, drink_level }) => {
      const user = await User.findOneAndUpdate(
        { _id: _id },
        {
          $pull: { drink_level: drink_level },
        },
        {
          new: true,
        }
      );
      return user;
    },

    // Mutation to increase popularity of an interest by one
    incPopularity: async (parent, { _id }) => {
      const interest = await Interest.findOneAndUpdate(
        { _id: _id },
        {
          $inc: { popularity: 1 },
        },
        {
          new: true,
        }
      );
      return interest;
    },

    // Mutation to decrease popularity of an interest by one
    decPopularity: async (parent, { _id }) => {
      const interest = await Interest.findOneAndUpdate(
        { _id: _id },
        {
          $inc: { popularity: -1 },
        },
        {
          new: true,
        }
      );
      return interest;
    },
    
    // Mutation to update (rename) an interest
    updateInterest: async (parent, { _id, name }) => {
      const interest = await Interest.findOneAndUpdate(
        { _id: _id },
        {
          name: name,
        },
        {
          new: true,
        }
      );
      return interest;
    },    

    // Mutation to delete a user
    deleteUser: async (parent, { _id }) => {
      const user = await User.findOneAndDelete({
        _id: _id,
      });

      return user;
    },

    // Mutation to delete an interest
    deleteInterest: async (parent, { _id }) => {
      const interest = await Interest.findOneAndDelete({
        _id: _id,
      });

      return interest;
    },
  },
};

module.exports = resolvers;
