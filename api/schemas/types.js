const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = require("graphql");
const { getNicknameLikes, getUserNicknames } = require("../modals/nicknames")

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
                return getUserNicknames(parent.user_id)
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
                return getNicknameLikes(parent.nickname_id)
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