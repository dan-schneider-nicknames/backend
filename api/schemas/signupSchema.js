const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt } = require('graphql');
const user = require('../models/user');

const signupSchema = new GraphQLObjectType({
    name: 'signupSchema',
    fields: () => ({
        addUser: {
            name: 'addUser',
            type: GraphQLString,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                username: { type: GraphQLString },
            },
            resolve: (parent, args) => {
                user.addUser(args);
            }
