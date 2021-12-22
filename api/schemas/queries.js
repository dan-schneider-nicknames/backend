const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");
const { NicknameType, UserType } = require("./types");
const randomBytes = require("randombytes")
const { promisify } = require("util")

const pagelength = 5;

const query = new GraphQLObjectType({
  name: "schneiderQuery",
  fields: () => ({
    nicknames: {
      type: new GraphQLList(NicknameType),
      args: {
        page: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, { page }, { user, modals }) => {
        try {
          if (!user) throw new Error("not authorized");
          const nicknames = await modals.Nicknames.getNicknames();
          const firstIndex = pagelength * page;
          const lastIndex = firstIndex + pagelength;

          if (nicknames.length < pagelength) {
            return nicknames;
          } else if (nicknames.length > lastIndex) {
            const searchedNicknames = await nicknames.slice(
              firstIndex,
              lastIndex
            );
            return searchedNicknames;
          } else {
            const lastNicknames = await nicknames.slice(
              -pagelength,
              nicknames.length
            );
            return lastNicknames;
          }
        } catch (err) {
          throw err;
        }
      },
      description: "List of nicknames",
    },
    user: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
      },
      resolve: async (parent, { username }, { user, modals }) => {
        try {
          if (!username) return user;
          const searchedUser = await modals.Users.getUserByUsername(username);
          return searchedUser;
        } catch (err) {
          throw err;
        }
      },
      description: "User by username",
    },
    requestReset: {
      type: GraphQLBoolean,
      description: "Endpoint for reseting a password by email",
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args, context) => {
        try {
          const { email } = args
          const { getUserByEmail, updateUserById } = context.modals.Users
          const { user_id } = await getUserByEmail(email)
          if (!user_id) throw new Error("No user found with that email."); 
          const randomBytesPromisified = promisify(randomBytes);
          const resetToken = (await randomBytesPromisified(20)).toString("hex");
          const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
          const id = await updateUserById(user_id, { resetToken, resetTokenExpiry })
          return id ? true : false
        } catch(err) {
          throw err
        }
      }
    }
  }),
});

module.exports = query;
