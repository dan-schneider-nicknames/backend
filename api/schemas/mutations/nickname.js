const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = require("graphql");
const { NicknameType } = require("../types")

const nicknameMutations = {
  addNickname: {
    name: "addNickname",
    type: NicknameType,
    args: {
      nickname: { type: new GraphQLNonNull(GraphQLString) },
      // user_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (parent, { nickname }, { user: { subject: user_id }, modals }) => {
      return modals.Nicknames.addNickname({ nickname, user_id });
    },
  },
  updateNickname: {
    name: "updateNickname",
    type: NicknameType,
    args: {
      nickname_id: { type: GraphQLID },
      nickname: { type: GraphQLString },
      user_id: { type: GraphQLID },
    },
    resolve: (parent, args, { modals }) => {
      return modals.Nicknames.updateNickname(args);
    },
  },
  deleteNickname: {
    name: "deleteNickname",
    type: NicknameType,
    args: {
      nickname_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (parent, args, { modals }) => {
      return modals.Nicknames.deleteNickname(args);
    },
  },
  likeNickname: {
    name: "addLike",
    type: GraphQLInt,
    args: {
      nickname_id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: (parent, { nickname_id }, { user: { subject: user_id }, modals }) => {
      return modals.Likes.likeNickname(nickname_id, user_id)
    }
  }
}

module.exports = nicknameMutations