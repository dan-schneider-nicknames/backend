const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const port = process.env.PORT || 8000;

// const nicknameType = new GraphQLObjectType({
//   name: "Nickname",
//   nickname: { type: GraphQLString },
// });

const schema = new GraphQLSchema({
  name: "RootQueryType",
  query: new GraphQLObjectType({
    name: "nickname",
    fields: () => ({
      nicknames: {
        type: new GraphQLList(GraphQLString),
        resolve: () => {
          return ["Dan", "Schneider"];
        },
      },
    }),
  }),
});

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(port, () => console.log(`Listening on port ${port}`));
