const { GraphQLNonNull, GraphQLString } = require("graphql");
const {
  signupResolver,
  resetResolver,
  loginResolver
} = require("../../resolvers/mutations-resolvers/user-resolvers")

const userMutations = {
  addUser: {
    name: "addUser",
    type: GraphQLString,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      username: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: signupResolver,
  },
  login: {
    name: "login",
    type: GraphQLString,
    args: {
      password: { type: new GraphQLNonNull(GraphQLString) },
      username: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: loginResolver,
  },
  resetPassword: {
    name: "reset Password",
    type: GraphQLString,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) }, 
      password: { type: new GraphQLNonNull(GraphQLString) }, 
      confirmPassword: { type: new GraphQLNonNull(GraphQLString) }, 
      resetToken: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: resetResolver
  }
};

module.exports = userMutations;
