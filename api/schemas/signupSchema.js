const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull
} = require("graphql");
const bcrypt = require("bcryptjs");
const user = require("../users/modal");

const userType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    user_id: { type: GraphQLInt },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    username: { type: GraphQLString },
  }),
});
const signupSchema = new GraphQLSchema({
  name: "UserSchema",
  query: new GraphQLObjectType({
    name: "userQuery",
    fields: () => ({
      user: {
        type: userType,
      },
    }),
  }),
  mutation: new GraphQLObjectType({
    name: "userMutation",
    fields: () => ({
      addUser: {
        name: "addUser",
        type: userType,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
          username: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (parent, args) => {
          const hash = bcrypt.hashSync(args.password, 10);
          const newUser = await user.addUser({ ...args, password: hash });
          return newUser;
        },
      },
    }),
  }),
});

module.exports = signupSchema;
