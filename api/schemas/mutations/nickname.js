const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
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
  },
  removeFouls: {
    name: "removeFouls",
    type: new GraphQLList(NicknameType),
    args: {
      nickname: { type: new GraphQLNonNull(GraphQLString) }
    }, 
    resolve: async (parent, args, context) => {
      try {
        const {nickname} = args
        const {modals} = context
        const {removeFoulNames} = modals.Nicknames
        const removedNicknames = await removeFoulNames(nickname)
        return removedNicknames
      } catch(err) {
        throw err
      }
    }
  }
}

module.exports = nicknameMutations