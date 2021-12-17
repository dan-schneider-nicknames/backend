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
      resolve: (parent, args, { modals: { Nicknames } }) => {
        const nicknames = Nicknames.getUserNicknames(parent.user_id);
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
      // resolve: async (parent, args, { modals: { Nicknames } }) => {
      //   try {
      //     const likes = await Nicknames.getNicknameLikes(parent.nickname_id);
      //     return likes;
      //   } catch(err) {
      //     throw err
      //   }
      // },
    },
    user: {
      type: UserType,
      resolve: async ({ user_id }, args, { modals: { Users } }) => {
        try {
          const user = await Users.getUserById(user_id);
          return user;
        } catch(err) {
          throw err
        }
      },
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
    },
    createdBy: {
      type: GraphQLBoolean,
      resolve: (parent, args, { user: { user_id } }) => {
        return user_id === parent.user_id
      },
    },
  }),
});

module.exports = {
  UserType,
  NicknameType,
};
