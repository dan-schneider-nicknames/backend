const bcryptjs = require("bcryptjs");

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
    email: {
      type: GraphQLString,
      resolve: (parent, args, context) => {
        const { user_id: userId, email } = parent;
        const { user_id } = context.user;
        return user_id === userId ? email : "Email is Confidential";
      },
    },
    password: {
      type: GraphQLString,
      resolve: (parent, args, context) => {
        const { user_id: userId, password } = parent;
        const { user_id } = context.user;
        return user_id === userId ? password : "Password is Confidential";
      },
    },
    username: { type: GraphQLString },
    nicknames: {
      type: new GraphQLList(NicknameType),
      resolve: (parent, args, { modals: { Nicknames } }) => {
        const nicknames = Nicknames.getUserNicknames(parent.user_id);
        return nicknames;
      },
      description: "List of nicknames associated with this user",
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
        try {
          const likes = await Nicknames.getNicknameLikes(parent.nickname_id);
          return likes;
        } catch (err) {
          throw err;
        }
      },
      description: "Number of likes for this nickname",
    },
    user: {
      type: UserType,
      resolve: async ({ user_id }, args, { modals: { Users } }) => {
        try {
          const user = await Users.getUserById(user_id);
          return user;
        } catch (err) {
          throw err;
        }
      },
      description: "User associated with this nickname",
    },
    liked: {
      type: GraphQLBoolean,
      resolve: async (
        { nickname_id },
        args,
        { user: { user_id }, modals: { Likes } }
      ) => {
        const [liked] = await Likes.getLike({ nickname_id, user_id });
        return liked ? true : false;
      },
      description: "Whether the current user has liked this nickname",
    },
    createdBy: {
      type: GraphQLBoolean,
      resolve: (parent, args, { user: { user_id } }) => {
        return user_id === parent.user_id;
      },
      description: "Whether the current user created this nickname",
    },
  }),
});

module.exports = {
  UserType,
  NicknameType,
};
