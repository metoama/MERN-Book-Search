const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
Mutation: {
    addUser: async (parent, { name, email, password }) => {
        const user = await User.create({ name, email, password });
        const token = signToken(user);

        return { token, user };
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AuthenticationError('User name or password is incorrect');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError('User name or password is incorrect');
        }

        const token = signToken(user);
        return { token, user };
    },

saveBook: async (parent, { BookInput }, context) => {
    if (context.user) {
        return User.findOneAndUpdate(
            { _id: context.user.Id },
            {
                $addToSet: { savedBooks: BookInput },
            },
            {
                new: true,
                runValidators: true,
            }
        );
    }
    
    throw new AuthenticationError('Please login first!');
},

removeUser: async (parent, args, context) => {
    if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
    }
     throw new AuthenticationError('Please login first!');
 },

 removeSkill: async (parent, { skill }, context) => {
    if (context.user) {
        return User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { skills: skill } },
            { new: true }
        );
    }
    throw new AuthenticationError('Please login first');
  },
 },
};

module.exports = resolvers;
        