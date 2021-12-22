
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
} = require("graphql");
const {
  likesResolver,
  emailResolver,
  passwordResolver,
  nicknamesResolver,
  userResolver,
  likedResolver,
  createdByResolver
} = require("../resolvers/types-resolvers")

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    user_id: { type: GraphQLID },
    email: {
      type: GraphQLString,
      resolve: emailResolver,
    },
    password: {
      type: GraphQLString,
      resolve: passwordResolver,
    },
    username: { type: GraphQLString },
    nicknames: {
      type: new GraphQLList(NicknameType),
      description: "List of nicknames associated with this user",
      resolve: nicknamesResolver,
    },
  }),
});

const NicknameType = new GraphQLObjectType({
  name: "nickname",
  fields: () => ({
    nickname_id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    nickname: { type: GraphQLString },
    likes: {
      type: GraphQLInt,
      description: "Number of likes for this nickname",
      resolve: likesResolver,
    },
    user: {
      type: UserType,
      resolve: userResolver,
      description: "User associated with this nickname",
    },
    liked: {
      type: GraphQLBoolean,
      resolve: likedResolver,
      description: "Whether the current user has liked this nickname",
    },
    createdBy: {
      type: GraphQLBoolean,
      resolve: createdByResolver,
      description: "Whether the current user created this nickname",
    },
  }),
});

module.exports = {
  UserType,
  NicknameType,
};
