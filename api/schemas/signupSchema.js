const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull
} = require("graphql");
const bcrypt = require("bcryptjs");
const user = require("../users/modal");
const { UserType } = require("./types");

const signupSchema = new GraphQLSchema({
  name: "UserSchema",
  query: new GraphQLObjectType({
    name: "userQuery",
    fields: () => ({
      user: {
        type: UserType,
      },
    }),
  }),
  mutation: new GraphQLObjectType({
    name: "userMutation",
    fields: () => ({
      addUser: {
        name: "addUser",
        type: UserType,
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
