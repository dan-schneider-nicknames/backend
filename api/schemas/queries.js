const { GraphQLObjectType, GraphQLList } = require("graphql")
const { NicknameType } = require("./types")
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
    }),
})

module.exports = query
