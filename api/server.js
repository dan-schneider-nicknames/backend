const { graphqlHTTP } = require("express-graphql");
const express = require("express");
const schema = require("./schemas/schema")
const cors = require("cors")
const app = express()
const checkToken = require("./middleware/checkToken")

app.use(cors())
app.use(express.json())

app.use(checkToken)

app.use("/", graphqlHTTP(req => ({
    schema,
    graphiql: true,
    context: {
        user: req.user
    }
})));


module.exports = app