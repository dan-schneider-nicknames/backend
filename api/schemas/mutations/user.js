const { GraphQLNonNull, GraphQLString } = require("graphql");
const { tokenBuilder } = require("../../middleware/tokenbuilder");
const bcrypt = require("bcryptjs")

const userMutations = {
    addUser: {
        name: "addUser",
        type: GraphQLString,
        args: {
            email: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
            username: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (parent, args, { modals }) => {
            const hash = bcrypt.hashSync(args.password, 10);
            const newUser = await modals.Users.addUser({ ...args, password: hash });
            return tokenBuilder(newUser)
        },
    },
    login: {
        name: "login",
        type: GraphQLString,
        args: {
            password: { type: new GraphQLNonNull(GraphQLString) },
            username: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (parent, args, { modals }) => {
            const { password, username } = args
            const user = await modals.Users.getUserByUsername(username)
            const { password: hashedPassword } = user
            if (bcrypt.compareSync(password, hashedPassword)) {
                return tokenBuilder(user)
            } else {
                throw new Error("invalid credentials")
            }
        }
    }
}

module.exports = userMutations;
