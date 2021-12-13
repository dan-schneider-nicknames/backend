
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./tokenbuilder")

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(
            token, 
            JWT_SECRET, 
            (err, decoded) => {
                if (err) {
                    next()
                } else {
                    const user = {
                        username: decoded.username,
                        password: decoded.password,
                        user_id: decoded.subject,
                    }
                    req.user = user
                    next()
                }
            }
        )
    } else {
        next()
    }
}