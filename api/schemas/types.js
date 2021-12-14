const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    user_id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    username: { type: GraphQLString },
    nicknames: {
      type: new GraphQLList(NicknameType),
      resolve: async (parent, args, { modals: { Nicknames } }) => {
        const nicknames = await Nicknames.getUserNicknames(parent.user_id);
        return nicknames;
      },
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
      resolve: async (parent, args, { modals: { Nicknames } }) => {
        const likes = await Nicknames.getNicknameLikes(parent.nickname_id);
        return likes;
      },
    },
    user: {
      type: UserType,
      resolve: async ({ user_id }, args, { modals: { Users } }) => {
        const user = await Users.getUserById(user_id);
        return user;
      },
    },
    liked: {
      type: GraphQLBoolean,
      resolve: async (
        { nickname_id },
        args,
        { user: { user_id }, modals: { Likes } }
      ) => {
        const liked = await Likes.getLike({ nickname_id, user_id });
        return liked ? true : false;
      },
    },
  }),
});

module.exports = {
  UserType,
  NicknameType,
};
