const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql");
const { tokenBuilder } = require("../middleware/tokenbuilder");
const { NicknameType, UserType } = require("./types");
const User = require("../modals/users")
const Nicknames = require("../modals/nicknames")
const bcrypt = require("bcryptjs")

const schema = new GraphQLSchema({
  name: "SchneiderSchema",
  query: new GraphQLObjectType({
    name: "schneiderQuery",
    fields: () => ({
      nicknames: {
        type: new GraphQLList(NicknameType),
        resolve: async () => {
          return await Nicknames.getNicknames()
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
      addUser: {
        name: "addUser",
        type: GraphQLString,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
          username: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (parent, args) => {
          const hash = bcrypt.hashSync(args.password, 10);
          const newUser = await User.addUser({ ...args, password: hash });
          const token = tokenBuilder(newUser)
          return token;
        },
      },
      login: {
        name: "login",
        type: GraphQLString,
        args: {
          password: { type: new GraphQLNonNull(GraphQLString) },
          username: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (parent, args) => {
          const { password, username } = args
          const user = await User.getUserByUsername(username)
          console.log(user)
          const { password: hashedPassword } = user
          if (bcrypt.compareSync(password, hashedPassword)) {
            return tokenBuilder(user)
          } else {
            throw new Error("invalid credentials")
          }
        }
      }
    }),
  }),
});

module.exports = schema;
