const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} = require("graphql");
const { NicknameType } = require("./types");
const nickname = require("../nicknames/modal");

const nicknameSchema = new GraphQLSchema({
  name: "SchneiderSchema",
  query: new GraphQLObjectType({
    name: "schneiderQuery",
    fields: () => ({
      nicknames: {
        type: NicknameType,
      },
    }),
  }),
  mutation: new GraphQLObjectType({
    name: "schneiderMutation",
    fields: () => ({
      addNickname: {
        name: "addNickname",
        type: NicknameType,
        args: {
          nickname: { type: new GraphQLNonNull(GraphQLString) },
          user_id: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: (parent, args) => {
          return nickname.addNickname(args);
        },
      },
      updateNickname: {
        name: "updateNickname",
        type: NicknameType,
        args: {
          nickname_id: { type: GraphQLInt },
          nickname: { type: GraphQLString },
          user_id: { type: GraphQLString },
        },
        resolve: (parent, args) => {
          return nickname.updateNickname(args);
        },
      },
      deleteNickname: {
        name: "deleteNickname",
        type: NicknameType,
        args: {
          nickname_id: { type: GraphQLInt },
        },
        resolve: (parent, args) => {
          return nickname.deleteNickname(args);
        },
      },
    }),
  }),
});

module.exports = nicknameSchema;
