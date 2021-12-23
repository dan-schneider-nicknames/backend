const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = require("graphql");
const { NicknameType } = require("../types")
const {
  addNickResolver,
  updateNickResolver,
  deleteNickResolver,
  likeNickResolver
} = require("../../resolvers/mutations-resolvers/nickname-resolvers")

const nicknameMutations = {
  addNickname: {
    name: "addNickname",
    type: NicknameType,
    args: {
      nickname: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: addNickResolver
  },
  updateNickname: {
    name: "updateNickname",
    type: NicknameType,
    args: {
      nickname_id: { type: GraphQLID },
      nickname: { type: GraphQLString },
      user_id: { type: GraphQLID },
    },
    resolve: updateNickResolver
  },
  deleteNickname: {
    name: "deleteNickname",
    type: NicknameType,
    args: {
      nickname_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: deleteNickResolver
  },
  likeNickname: {
    name: "addLike",
    type: GraphQLInt,
    args: {
      nickname_id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: likeNickResolver
  }
}

module.exports = nicknameMutations