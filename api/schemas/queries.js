const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql")
const { NicknameType, UserType } = require("./types")

const query = new GraphQLObjectType({
    name: "schneiderQuery",
    fields: () => ({
        nicknames: {
            type: new GraphQLList(NicknameType),
            resolve: async (parent, args, { user, modals }) => {
                // if (!user) throw new Error("not authorized")
                return await modals.Nicknames.getNicknames()
            }
        },
        user: {
            type: UserType,
            args: {
                username: {
                    type: GraphQLString
                },
            },
            resolve: async (parent, { username }, { user, modals }) => {
                if (!username) return user
                return await modals.Users.getUserByUsername(username)
            }
        },
    }),
})

module.exports = query
