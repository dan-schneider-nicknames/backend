const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql")
const { NicknameType, UserType } = require("./types")

const query = new GraphQLObjectType({
    name: "schneiderQuery",
    fields: () => ({
        nicknames: {
            type: new GraphQLList(NicknameType),
            args: {
                page: { type: new GraphQLNonNull(GraphQLInt) },

            },
            resolve: async (parent, { page }, { user, modals }) => {
                try {
                    if (!user) throw new Error("not authorized")
                    const nicknames = await modals.Nicknames.getNicknames()
                    const pagelength = 7
                    if (nicknames.length < pagelength) { 
                        return nicknames
                    } else if (nicknames.length > pagelength * (page + 1)) {
                        return nicknames.slice(pagelength * page, pagelength * (page + 1))
                    } else {
                        return nicknames.slice(-pagelength, nicknames.length)
                    }
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
