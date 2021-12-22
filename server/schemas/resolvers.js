const { AuthenticationError } = require("apollo-server-express");
const { User, Interest } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    // Query for all users
    users: async () => {
      return User.find().populate("interests").populate("drinking_buddies");
    },

    // Query for one user
    user: async (parent, { _id }, context) => {
      console.log(context);
      return User.findById(_id).populate("interests");
    },

    // Query for all interests
    interests: async () => {
      return await Interest.find()
        .populate("created_by")
        .sort({ popularity: -1 });
    },

    // Query for one interest
    interest: async (parent, { _id }) => {
      return await Interest.findById({ _id: _id }).populate("created_by");
    },
  },

  Mutation: {
    // Mutation to add an interest
    addInterest: async (parent, { name, user }) => {
      name = name.toLowerCase();
      const interest = await Interest.create({ name: name, created_by: user });
      return interest;
    },

    // Mutation to sign up
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = await signToken(user);

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

      return { token, user };
    },

    // Mutation to update views
    updateUserInfo: async (parent, { _id, name, email, password }) => {
      const saltRounds = 10;
      const newPassword = await bcrypt.hash(password, saltRounds);

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
      const addedInterest = await Interest.findById({ _id: interest });
      const oldData = await User.findById(_id).populate("interests");
      const currentInterests = oldData.interests.map((interest) => {
        return interest._id;
      });

      if (currentInterests.includes(interest)) {
        return;
      }

      const user = await User.findOneAndUpdate(
        { _id: _id },
        {
          $push: { interests: addedInterest },
        },
        {
          new: true,
        }
      ).populate("interests");
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
      ).populate("interests");
      return user;
    },

    // Mutation to add a drinking buddy to a user
    addDrinkingBuddy: async (parent, { _id, drinking_buddy }) => {
      const addedBuddy = await User.findById({ _id: drinking_buddy });
      const oldData = await User.findById(_id).populate("drinking_buddies");
      const currentBuddies = oldData.drinking_buddies.map((buddy) => {
        return buddy._id;
      });

      if (currentBuddies.includes(drinking_buddy)) {
        return;
      }

      const user = await User.findOneAndUpdate(
        { _id: _id },
        {
          $push: { drinking_buddies: addedBuddy },
        },
        {
          new: true,
        }
      ).populate("drinking_buddies");
      return user;
    },

    // Mutation to delete a drinking buddy from a user
    deleteDrinkingBuddy: async (parent, { _id, drinking_buddy }) => {
      const user = await User.findOneAndUpdate(
        { _id: _id },
        {
          $pull: { drinking_buddies: drinking_buddy },
        },
        {
          new: true,
        }
      ).populate("drinking_buddy");
      return user;
    },

    // Mutation to add a price-range to a user
    addPriceRange: async (parent, { _id, price_range }) => {
      const oldData = await User.findById(_id);
      const currentRanges = oldData.price_range;

      if (currentRanges.includes(price_range)) {
        return;
      }

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
      const oldData = await User.findById(_id);
      const currentLevels = oldData.drink_level;

      if (currentLevels.includes(drink_level)) {
        return;
      }

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
