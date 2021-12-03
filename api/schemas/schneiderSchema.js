const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");

const nicknameType = new GraphQLObjectType({
    name: "nickaname",
    fields: () => ({
        nickname: { type: GraphQLString },
        likes: { type:  GraphQLInt },
        creator: { type: GraphQLString } 
    })
});

const schema = new GraphQLSchema({
    name: "RootQueryType",
    query: new GraphQLObjectType({
        name: "nickname",
        fields: () => ({
            nicknames: {
                type: new GraphQLList(nicknameType),
                // resolve: () => {
                //     return ["Dan", "Schneider"];
                // },
            },
        }),
    }),
});

module.exports = schema