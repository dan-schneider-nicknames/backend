const { graphqlHTTP } = require("express-graphql");
const app = require("express")();
const signupSchema = require("./schemas/signupSchema");
const schneiderSchema = require("./schemas/schneiderSchema");
const schema = require("./schemas/schneiderSchema")

app.use("/graphql", graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
);

app.use('/', graphqlHTTP({
    schema: signupSchema,
    graphiql: true,
    })
);

app.use('/schneider', graphqlHTTP({
    schema: schneiderSchema, 
    graphiql: true,
    })
);

module.exports = app