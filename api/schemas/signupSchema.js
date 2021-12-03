const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
} = require("graphql");
const bcrypt = require("bcryptjs");
const user = require("../users/modal");

const signupSchema = new GraphQLSchema({
  name: "signupSchema",
  fields: () => ({
    addUser: {
      name: "addUser",
      type: GraphQLString,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        username: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const hash = bcrypt.hashSync(args.password, 10);
        user.addUser({ ...args, password: hash }).then((res) => {
          return res;
        });
      },
    },
  }),
});
module.exports = signupSchema;
