const { graphqlHTTP } = require("express-graphql");
const app = require("express")();
const schema = require("./schemas/schneiderSchema")

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
);

app.use('/', graphqlHTTP({
    schema: schema,
    graphiql: true,
    })
);

module.exports = app