const { GraphQLNonNull, GraphQLString } = require("graphql");
const { tokenBuilder } = require("../../middleware/tokenbuilder");
const User = require("../../modals/users");
const bcrypt = require("bcryptjs");

const userMutations = {
  addUser: {
    name: "addUser",
    type: GraphQLString,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      username: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      const hash = bcrypt.hashSync(args.password, 10);
      const newUser = await User.addUser({ ...args, password: hash });
      const token = tokenBuilder(newUser);
      return token;
    },
  },
  login: {
    name: "login",
    type: GraphQLString,
    args: {
      password: { type: new GraphQLNonNull(GraphQLString) },
      username: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      const { password, username } = args;
      const user = await User.getUserByUsername(username);
      if (!user) {
        throw new Error("User not found");
      }
      const { password: hashedPassword } = user;
      if (bcrypt.compareSync(password, hashedPassword)) {
        return tokenBuilder(user);
      } else {
        throw new Error("invalid credentials");
      }
    },
  },
};

module.exports = userMutations;
