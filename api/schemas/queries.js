const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql")
const { NicknameType, UserType } = require("./types")

const query = new GraphQLObjectType({
    name: "schneiderQuery",
    fields: () => ({
        nicknames: {
            type: new GraphQLList(NicknameType),
            resolve: async (parent, args, { user, modals }) => {
                try {
                    if (!user) throw new Error("not authorized")
                    const nicknames = await modals.Nicknames.getNicknames()
                    return nicknames
                } catch(err) {
                    throw err
                }
            }
        },
        user: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
            },
            resolve: async (parent, { username }, { user, modals }) => {
                try {
                    if (!username) return user
                    const searchedUser = await modals.Users.getUserByUsername(username)
                    return searchedUser
                } catch(err) {
                    throw err
                }
            }
        },
    }),
})

module.exports = query
