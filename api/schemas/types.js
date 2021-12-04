const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");

const UserType = new GraphQLObjectType({
    name: "user",
    fields: () => ({
      user_id: { type: GraphQLInt },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      username: { type: GraphQLString },
    }),
});

const NicknameType = new GraphQLObjectType({
    name: "nickname",
    fields: () => ({
        nickname: { type: GraphQLString },
        likes: { type:  GraphQLInt },
        creator: { type: GraphQLString } 
    })
});

module.exports = {
    UserType,
    NicknameType
}