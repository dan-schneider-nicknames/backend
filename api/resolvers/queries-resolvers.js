const randomBytes = require("randombytes")
const { promisify } = require("util")


const nicknamesQueryResolver = async (parent, args, context) => {
  try {
    const { page , sortBy } = args;
    const { user, modals } = context
    const { getNicknames, getNicknameLikes } = modals.Nicknames
    if (!user) throw new Error("not authorized");
    const nicknames = await getNicknames();
    // if (!sortBy) return paginate(nicknames, page)
    const nicknamesWithLikes = await Promise.all(
      nicknames.map(async n => ({
        ...n,
        likes: await getNicknameLikes(n.nickname_id)
      }))
    )
    const sortedNicknames = await nicknamesWithLikes.sort((a,b) => b.likes - a.likes)
    return paginate(sortedNicknames, page)
  } catch (err) {
    throw err;  
  }
}

const paginate = async (data, page) => {
  const pagelength = 5;
  const firstIndex = pagelength * page;
  const lastIndex = firstIndex + pagelength;
  if (data.length < pagelength) {
    return data;
  } else if (data.length > lastIndex) {
    const searchedData = await data.slice(
      firstIndex,
      lastIndex
    );
    return searchedData;
  } else {
    const lastData = await data.slice(
      -pagelength,
      data.length
    );
    return lastData;
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
    const resetTokenExpiry = JSON.stringify(Date.now() + 3600000); // 1 hour from now
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