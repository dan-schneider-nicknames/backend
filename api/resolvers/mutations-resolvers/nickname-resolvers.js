

const addNickResolver = async (parent, args, context) => {
  try {
    const { nickname } = args;
    const { user, modals, authentication } = context
    const { user_id } = user
    const { addNickname } = modals.Nicknames
    const { validateNickname } = authentication
    await validateNickname(nickname, modals)
    const newNickname = await addNickname({ nickname, user_id });
    return newNickname
  } catch(err) {
    throw err
  }
}

const updateNickResolver = async (parent, args, context) => {
  try {
    const { updateNickname } = context.modals.Nicknames
    const updatedNickname = await updateNickname(args);
    return updatedNickname
  } catch(err) {
    throw err
  }
}

const deleteNickResolver = async (parent, args, context) => {
  try {
    const { nickname_id } = args;
    const { deleteNickname, getNicknameById } = context.modals.Nicknames
    const { user_id } = context.user
    const toBeDeleted = await getNicknameById(nickname_id)
    if (user_id !== toBeDeleted.user_id) {
      throw new Error("You can't delete another persons nicknames")
    }
    const removedNickname = await deleteNickname(nickname_id);
    return removedNickname
  } catch(err) {
    throw err
  }
}

const likeNickResolver = async (parent, args, context) => {
  try {
    const { nickname_id } = args;
    const { user, modals } = context
    const { user_id } = user
    const { likeNickname } = modals.Likes
    const like = await likeNickname({ nickname_id, user_id })
    return like
  } catch(err) {
    throw err
  }
}

module.exports = {
  addNickResolver,
  updateNickResolver,
  deleteNickResolver,
  likeNickResolver
}