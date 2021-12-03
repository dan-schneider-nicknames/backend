const db = require("../../data/db-config")

const addUser = (user) => {
    return db("users").insert(user)
    .then(([user_id])=>{
        return db("users").where({user_id}).first()
    });
}

const verifyUser = () => {

}

module.exports = {
    addUser,
    verifyUser
}