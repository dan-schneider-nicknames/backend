const { graphqlHTTP } = require("express-graphql");
const app = require("express")();
const schema = require("./schema")

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
);

module.exports = app