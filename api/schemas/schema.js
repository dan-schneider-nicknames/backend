const { GraphQLSchema } = require("graphql");
const query = require("./queries")
const mutation = require("./mutations")

const schema = new GraphQLSchema({
  name: "SchneiderSchema",
  query,
  mutation
});

module.exports = schema;
