const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");
const { NicknameType, UserType } = require("./types");
const { nicknamesQueryResolver, userQueryResolver, resetQueryResolver} = require("../resolvers/queries-resolvers");

const query = new GraphQLObjectType({
  name: "schneiderQuery",
  fields: () => ({
    nicknames: {
      type: new GraphQLList(NicknameType),
      args: {
        sortBy: {
          type: GraphQLBoolean
        },
        page: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: nicknamesQueryResolver,
      description: "List of nicknames",
    },
    user: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
      },
      resolve: userQueryResolver,
      description: "User by username",
    },
    requestReset: {
      type: GraphQLBoolean,
      description: "Endpoint for reseting a password by email",
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: resetQueryResolver
    }
  }),
});

module.exports = query;
