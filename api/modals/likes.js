const db = require("../../data/db-config")
const { likes } = require("../../data/tableNames")

const getLike = async like => {
    return await db(likes)
        .where(like)
} 

const likeNickname = async (nickname_id, user_id) => {
    const like = { nickname_id, user_id }
    const likedBefore = await getLike(like)

    if (likedBefore) {
        return await getLike(like).first().del().returning("*")
    } else {
        return await db(likes)
            .insert({
                nickname_id,
                user_id
            })
            .returning("*")
    }
}

const unlikeNickname = (nickname_id, user_id) => {
    return db(likes)
        .where({ nickname_id, user_id })
        .del()
        .returning("*")
}

module.exports = {
    likeNickname,
    unlikeNickname
}