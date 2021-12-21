const axios = require('axios')
const verifyURL = process.env.EMAIL_API_URL

const signupValidation = async (modals, {email, username}) => {
    try{
        const exists = await axios.get(verifyURL + email)
        if(!exists.data.status){throw new Error("Not a valid email")}
        const oldUser = await modals.Users.getUserByEmail(email);
        if (oldUser) {
            throw new Error("User already exists with that Email");
        }
        const olderUser = await modals.Users.getUserByUsername(username);
        if (olderUser) {
            throw new Error("User already exists with that Username");
        }
    } catch(err) {
        throw err
    }
}


module.exports = {
    signupValidation,
}