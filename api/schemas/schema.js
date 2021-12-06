const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql");
const { NicknameType, UserType } = require("./types");
// const nicknames = require("../nicknames/modal");

const schema = new GraphQLSchema({
  name: "SchneiderSchema",
  query: new GraphQLObjectType({
    name: "schneiderQuery",
    fields: () => ({
      nicknames: {
        type: new GraphQLList(NicknameType),
        resolve: (parent, args, { user }) => {
          // return nicknames.getUserNicknames()
        }
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
          user_id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: (parent, args) => {
          return nickname.addNickname(args);
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
          return nickname.updateNickname(args);
        },
      },
      deleteNickname: {
        name: "deleteNickname",
        type: NicknameType,
        args: {
          nickname_id: { type: GraphQLID },
        },
        resolve: (parent, args) => {
          return nickname.deleteNickname(args);
        },
      },
      addUser: {
        name: "addUser",
        type: UserType,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
          username: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (parent, args) => {
          const hash = bcrypt.hashSync(args.password, 10);
          const newUser = await user.addUser({ ...args, password: hash });
          return newUser;
        },
      },
    }),
  }),
});

module.exports = schema;
