const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = require("graphql");

const UserType = new GraphQLObjectType({
    name: "user",
    fields: () => ({
        user_id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        username: { type: GraphQLString },
        nicknames: {
            type: NicknameType,
            resolve: (parent, args) => {
                // code that returns all users nicknames
            }
        }
    }),
});

const NicknameType = new GraphQLObjectType({
    name: "nickname",
    fields: () => ({
        user_id: { type: GraphQLID },
        nickname: { type: GraphQLString },
        likes: { 
            type: GraphQLInt,
            resolve: (parent, args) => {
                // function for getting number of likes
            }
        },
        creator: { 
            type: UserType,
            resolve: (parent, args) => {
                // function that returns user
            } 
        } 
    })
});

module.exports = {
    UserType,
    NicknameType
}