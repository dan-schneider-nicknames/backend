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
    },
    resolve: async (parent, { nickname }, { user: { user_id }, modals }) => {
      try {
        if (!user) throw new Error("not authorized")
        const newNickname = await modals.Nicknames.addNickname({ nickname, user_id });
        return newNickname
      } catch(err) {
        throw err
      }
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
    resolve: async (parent, args, { modals, user }) => {
      try {
        if (!user) throw new Error("not authorized")
        const updatedNickname = await modals.Nicknames.updateNickname(args);
        return updatedNickname
      } catch(err) {
        throw err
      }
    },
  },
  deleteNickname: {
    name: "deleteNickname",
    type: NicknameType,
    args: {
      nickname_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (parent, { nickname_id }, { user, modals }) => {
      try {
        if (!user) throw new Error("not authorized")
        const removedNickname = await modals.Nicknames.deleteNickname(nickname_id);
        return removedNickname
      } catch(err) {
        throw err
      }
    },
  },
  likeNickname: {
    name: "addLike",
    type: GraphQLInt,
    args: {
      nickname_id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (parent, { nickname_id }, { user: { user_id }, modals }) => {
      try {
        if (!user) throw new Error("not authorized")
        const like = await modals.Likes.likeNickname({ nickname_id, user_id })
        return like
      } catch(err) {
        throw err
      }
    }
  }
}

module.exports = nicknameMutations