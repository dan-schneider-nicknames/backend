
const likesResolver = async (parent, args, context) => {
    try {
        const { nickname_id } = parent
        if (parent.likes) return parent.likes
        const { getNicknameLikes } = context.modals.Nicknames
        const likes = await getNicknameLikes(nickname_id);
        return likes;
    } catch (err) {
      throw err;
    }
}

const nicknamesResolver = async (parent, args, context) => {
    try {
        const { user_id } = parent
        const { getUserNicknames } = context.modals.Nicknames
        const nicknames = await getUserNicknames(user_id);
        return nicknames;
    } catch(err) {
        throw err
    } 
}

const likedResolver = async (parent, args, context) => {
    try {
        const { nickname_id } = parent
        const { user_id } = context.user
        const { getLike } = context.modals.Likes
        const [liked] = await getLike({ nickname_id, user_id });
        return liked ? true : false;
    } catch(err) {
        throw err
    }
}

const createdByResolver = (parent, args, context) => {
    const { user_id } = parent
    const { user_id: userId } = context.user
    return user_id === userId;
  }

const userResolver = async (parent, args, context) => {
    try {
        const { user_id } = parent
        const { getUserById } = context.modals.Users
        const user = await getUserById(user_id);
        return user;
    } catch (err) {
        throw err;
    }
  }

const privateProperty = keyname => (parent, args, context) => {
    const { user_id: userId } = parent;
    const { user_id } = context.user;
    return user_id === userId ? parent[keyname] : `${keyname} is Confidential`;
}

const emailResolver = privateProperty("email")

const passwordResolver = privateProperty("password")

module.exports = {
    likesResolver,
    emailResolver,
    passwordResolver,
    nicknamesResolver,
    userResolver,
    likedResolver,
    createdByResolver
}