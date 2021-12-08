const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = require("graphql");
const Nicknames = require("../modals/nicknames")
const Users = require("../modals/users")

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
                return Nicknames.getUserNicknames(parent.user_id)
            }
        }
    }),
});

const NicknameType = new GraphQLObjectType({
    name: "nickname",
    fields: () => ({
        nickname_id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        nickname: { type: GraphQLString },
        likes: { 
            type: GraphQLInt,
            resolve: parent => {
                return Nicknames.getNicknameLikes(parent.nickname_id)
            }
        },
        user: { 
            type: UserType,
            resolve: ({ user_id }) => {
                return Users.getUserById(user_id)
            } 
        } 
    })
});

module.exports = {
    UserType,
    NicknameType
}