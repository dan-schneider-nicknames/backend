
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
                    req.user = decoded
                    next()
                }
            }
        )
    } else {
        next()
    }
}