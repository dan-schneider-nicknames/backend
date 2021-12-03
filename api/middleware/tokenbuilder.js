const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET || "I like pinapple on pizza"

const tokenBuilder = user => {
    const payload = {
        subject: user.user_id,
        username: user.username,
        password: user.password,
    }
    const options = {
        expiresIn: "1d"
    }
    return jwt.sign(
        payload,
        JWT_SECRET,
        options
    )
}

module.exports = {
    JWT_SECRET,
    tokenBuilder
}