const { GraphQLSchema, GraphQLObjectType, GraphQLList } = require("graphql");
const { NicknameType } = require("./types")

const schema = new GraphQLSchema({
    name: "RootQueryType",
    query: new GraphQLObjectType({
        name: "getNickname",
        fields: () => ({
            nicknames: {
                type: new GraphQLList(NicknameType),
                resolve: () => {
                },
            },
        }),
    }),
});

module.exports = schema