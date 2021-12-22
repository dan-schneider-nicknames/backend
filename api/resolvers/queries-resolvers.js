const randomBytes = require("randombytes")
const { promisify } = require("util")

const pagelength = 5;

const nicknamesQueryResolver = async (parent, args, context) => {
  try {
    const { page } = args;
    const { user, modals } = context
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
}

const userQueryResolver = async (parent, args, context) => {
  try {
    const {username} = args
    const {user, modals} = context
    if (!username) return user;
    const { getUserByContext } = modals.Users
    const searchedUser = await getUserByContext(username);
    if (!searchedUser) throw new Error("No such user")
    return searchedUser;
  } catch (err) {
    throw err;
  }
}

const resetQueryResolver = async (parent, args, context) => {
  try {
    const { email } = args
    const { sendResetToken } = context.authentication
    const { getUserByEmail, updateUserById } = context.modals.Users
    const user = await getUserByEmail(email)
    if (!user) throw new Error("No user found with that email."); 
    const randomBytesPromisified = promisify(randomBytes);
    const resetToken = (await randomBytesPromisified(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    const id = await updateUserById(user.user_id, { resetToken, resetTokenExpiry })
    sendResetToken(resetToken, user.email)
    return id ? true : false
  } catch(err) {
    throw err
  }
}

module.exports = {
    nicknamesQueryResolver,
    userQueryResolver,
    resetQueryResolver
}