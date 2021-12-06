const db = require("../../data/db-config")
const { likes } = require("../../data/tableNames")

const likeNickname = (nickname_id, user_id) => {
    return db(likes)
        .insert({
            nickname_id,
            user_id
        })
        .returning("*")
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