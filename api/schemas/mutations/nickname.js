const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} = require("graphql");
const Nicknames = require('../../modals/nicknames')
const { NicknameType } = require("../types")

const nicknameMutations = {
  addNickname: {
    name: "addNickname",
    type: NicknameType,
    args: {
      nickname: { type: new GraphQLNonNull(GraphQLString) },
      user_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (parent, args) => {
      return Nicknames.addNickname(args);
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
      nickname_id: { type: GraphQLID },
    },
    resolve: (parent, args) => {
      return Nicknames.deleteNickname(args);
    },
  },
}

module.exports = nicknameMutations