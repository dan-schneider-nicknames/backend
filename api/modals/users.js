const db = require("../../data/db-config")
const { users } = require("../../data/tableNames")

const getUsers = () => {
    return db(users)
}

const addUser = user => {
    return db(users)
        .insert(user)
        .then(([user_id])=>{
            return getUserById(user_id)
        });
}

const getUserById = user_id => {
    return db(users)
        .where({ user_id })
        .first()
}

const getUserByUsername = username => {
    return db(users).where({ username }).first()
}

module.exports = {
    getUsers,
    addUser,
    getUserById,
    getUserByUsername
}