const db = require("../../data/db-config")

const likeNickname = (nickname_id, user_id) => {
    return db("likes")
        .insert({
            nickname_id,
            user_id
        })
        .returning("*")
}

const unlikeNickname = (like_id) => {
    return db("likes")
        .where({ like_id })
        .del()
        .returning("*")
}

module.exports = {
    likeNickname,
    unlikeNickname
}