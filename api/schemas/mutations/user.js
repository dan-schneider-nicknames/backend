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
            try {
                const { email, username } = args;
                const oldUser = await modals.Users.getUserByEmail(email);
                if (oldUser) {
                    throw new Error("User already exists with that Email");
                }
                const olderUser = await modals.Users.getUserByUsername(username);
                if (olderUser) {
                    throw new Error("User already exists with that Username");
                }
                const hash = bcrypt.hashSync(args.password, 10);
                const newUser = await modals.Users.addUser({ ...args, password: hash });
                return tokenBuilder(newUser)
            } catch(err) {
                throw err
            }
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
            try {
                const { password, username } = args
                const user = await modals.Users.getUserByContext(username)
                if (!user) throw new Error("Invalid Username or Email")
                const { password: hashedPassword } = user
                if (!bcrypt.compareSync(password, hashedPassword)) {
                    throw new Error("Invalid password")
                } 
                return tokenBuilder(user)
            } catch(err) {
                throw err
            }
        }
    }
}

module.exports = userMutations;
