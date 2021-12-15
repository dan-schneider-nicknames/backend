const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql")
const { NicknameType, UserType } = require("./types")

const pagelength = 7

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
                    if (nicknames.length < pagelength) { 
                        return nicknames
                    } else if (nicknames.length > pagelength * (page + 1)) {
                        const searchedNicknames = await nicknames.slice(pagelength * page, pagelength * (page + 1))
                        return searchedNicknames
                    } else {
                        const lastNicknames = await nicknames.slice(-pagelength, nicknames.length)
                        return lastNicknames
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
