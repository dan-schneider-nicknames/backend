const { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require("graphql");
const { tokenBuilder } = require("../../middleware/tokenbuilder");
const bcrypt = require("bcryptjs");
const { SALT } = process.env
const saltRounds = parseInt(SALT)

const userMutations = {
  addUser: {
    name: "addUser",
    type: GraphQLString,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      username: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args, { modals, authentication }) => {
      try {
        await authentication.signupValidation(modals, args);
        const hash = bcrypt.hashSync(args.password, saltRounds);
        const newUser = await modals.Users.addUser({ ...args, password: hash });
        await authentication.sendConfirmation(newUser)
        return tokenBuilder(newUser);
      } catch (err) {
        throw err;
      }
    },
  },
  login: {
    name: "login",
    type: GraphQLString,
    args: {
      password: { type: new GraphQLNonNull(GraphQLString) },
      username: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args, { modals }) => {
      try {
        const { password, username } = args;
        const user = await modals.Users.getUserByContext(username);
        if (!user) throw new Error("Invalid Username or Email");
        const { password: hashedPassword } = user;
        if (!bcrypt.compareSync(password, hashedPassword)) {
          throw new Error("Invalid password");
        }
        return tokenBuilder(user);
      } catch (err) {
        throw err;
      }
    },
  },
  resetPassword: {
    name: "reset Password",
    type: GraphQLString,
    args: {
      email: { type: GraphQLString }, 
      password: { type: GraphQLString }, 
      confirmPassword: { type: GraphQLString }, 
      resetToken: { type: GraphQLString }
    },
    resolve: async (parent, args, context) => {
      try {
        const { email, password, confirmPassword, resetToken } = args
        const { getUserBy, updateUserById } = context.modals.Users
        if (password !== confirmPassword) {
          throw new Error(`Your passwords don't match`);
        }
        const { user_id, resetTokenExiry } = await getUserBy({ resetToken })
        if (Date.now() >= resetTokenExiry) throw new Error("Reset token is expired")

        if (!user_id)
          throw new Error(
            "Your password reset token is either invalid or expired."
          )
        const hash = await bcrypt.hash(password, saltRounds);
  
        const result = await updateUserById(user_id, { password: hash });
  
        // jwt
        const token = await tokenBuilder(result);
        return token;
      } catch(err) {
        throw err
      }
    }
  }
};

module.exports = userMutations;
