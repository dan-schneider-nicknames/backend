const { GraphQLObjectType, GraphQLList } = require("graphql")
const { NicknameType, UserType } = require("./types")
const Nicknames = require("../modals/nicknames")

const query = new GraphQLObjectType({
    name: "schneiderQuery",
    fields: () => ({
        nicknames: {
            type: new GraphQLList(NicknameType),
            resolve: async (parent, args, { user }) => {
                if (!user) throw new Error("not authorized")
                return await Nicknames.getNicknames()
            }
        },
        user: {
            type: UserType,
            resolve: async (parent, args, { user }) => {
                return user
            }
        }
    }),
})

module.exports = query
