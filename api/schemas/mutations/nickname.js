const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = require("graphql");
const Nicknames = require('../../modals/nicknames')
const { NicknameType } = require("../types")
const Likes = require("../../modals/likes")

const nicknameMutations = {
  addNickname: {
    name: "addNickname",
    type: NicknameType,
    args: {
      nickname: { type: new GraphQLNonNull(GraphQLString) },
      // user_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (parent, { nickname }, { user: { subject: user_id } }) => {
      return Nicknames.addNickname({ nickname, user_id });
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
    resolve: (parent, args) => {
      return Nicknames.updateNickname(args);
    },
  },
  deleteNickname: {
    name: "deleteNickname",
    type: NicknameType,
    args: {
      nickname_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (parent, args) => {
      return Nicknames.deleteNickname(args);
    },
  },
  likeNickname: {
    name: "addLike",
    type: GraphQLInt,
    args: {
      nickname_id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: (parent, { nickname_id }, { user: { subject: user_id } }) => {
      return Likes.likeNickname(nickname_id, user_id)
    }
  }
}

module.exports = nicknameMutations