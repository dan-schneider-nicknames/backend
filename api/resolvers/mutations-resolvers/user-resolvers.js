const { tokenBuilder } = require("../../middleware/tokenbuilder");
const { hashSync, compareSync } = require("bcryptjs");
const { SALT } = process.env
const saltRounds = parseInt(SALT)

const signupResolver = async (parent, args, context) => {
  try {
    const { modals, authentication } = context
    const { signupValidation, sendConfirmation } = authentication
    const { addUser } = modals.Users
    await signupValidation(modals, args);
    const hash = hashSync(args.password, saltRounds);
    const newUser = await addUser({ ...args, password: hash });
    await sendConfirmation(newUser)
    return tokenBuilder(newUser);
  } catch (err) {
    throw err;
  }
}

const loginResolver = async (parent, args, { modals }) => {
  try {
    const { password, username } = args;
    const user = await modals.Users.getUserByContext(username);
    if (!user) throw new Error("Invalid Username or Email");
    const { password: hashedPassword } = user;
    if (!compareSync(password, hashedPassword)) {
      throw new Error("Invalid password");
    }
    return tokenBuilder(user);
  } catch (err) {
    throw err;
  }
}

const resetResolver = async (parent, args, context) => {
  try {
    const { email, password, confirmPassword, resetToken } = args
    const { getUserBy, updateUserById } = context.modals.Users
    if (password !== confirmPassword) {
      throw new Error(`Your passwords don't match`);
    }
    const { user_id, resetTokenExpiry } = await getUserBy({ resetToken, email })
    if (!user_id) {
      throw new Error("Your reset token is invalid.")
    }
    if (Date.now() >= resetTokenExpiry) {
      throw new Error("Reset token is expired")
    }
    const hash = await hashSync(password, saltRounds);

    const user = await updateUserById(user_id, { password: hash });
    return tokenBuilder(user);
  } catch(err) {
    throw err
  }
}

module.exports = {
    signupResolver,
    resetResolver,
    loginResolver
}