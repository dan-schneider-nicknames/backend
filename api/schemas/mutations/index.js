const { GraphQLObjectType } = require("graphql");
const nicknameMutations = require("./nickname")
const userMutations = require("./user")

const mutation = new GraphQLObjectType({
    name: "schneiderMutation",
    fields: () => ({
      ...nicknameMutations,
      ...userMutations,
    }),
})

module.exports = mutation