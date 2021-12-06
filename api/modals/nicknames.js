const db = require("../../data/db-config")
const { nicknames, likes } = require("../../data/tableNames")

const getUserNicknames = async user_id => {
    try {
        return await db(nicknames).where({ user_id })
    } catch(err) {
        console.log(err)
    }
}

const getNicknames = () => db(nicknames)

const getNicknameLikes = async nickname_id => {
    try {
        const { length } = await db(likes).where({ nickname_id })
        return length
    } catch(err) {
        console.log(err)
    }
}

const getNicknameById = nickname_id => {
    return db(nicknames)
    .where({ nickname_id })
    .first()
}

const addNickname = (nickname) => {
    return db(nicknames)
    .insert(nickname)
    .then(([nickname_id]) => {
        return getNicknameById(nickname_id)
    })
}

const deleteNickname = nickname_id => {
    return db(nicknames)
    .where({ nickname_id })
    .del()
}


module.exports = {
    getUserNicknames,
    getNicknameLikes,
    getNicknameById,
    addNickname,
    deleteNickname,
    getNicknames
}
