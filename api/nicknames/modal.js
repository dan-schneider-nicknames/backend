const db = require("../../data/db-config")
const { nicknames, likes } = require("../../data/tableNames")

const getUserNicknames = async user_id => {
    try {
        return await db(nicknames).where({ user_id })
    } catch(err) {
        console.log(err)
    }
}

const getNicknameLikes = async nickname_id => {
    try {
        const { length } = await db(likes).where({ nickname_id })
        return length
    } catch(err) {
        console.log(err)
    }
}

const addNickname = () => {
    
}

module.exports = {
    getUserNicknames,
    getNicknameLikes,
    addNickname
}
