import graphql from 'graphql';
import User from '../models/user';
import { createUser, signInUser } from './resolvers/auth';

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        login: { type: GraphQLString },
    }),
});

const AuthDataType = new GraphQLObjectType({
    name: 'AuthData',
    fields: () => ({
        token: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            resolve: () => {
                return User.find({});
            },
        },
    },
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                login: {
                    name: 'login',
                    type: GraphQLString,
                },
                password: {
                    name: 'password',
                    type: GraphQLString,
                },
            },
            resolve: createUser,
        },
        signInUser: {
            type: GraphQLString,
            args: {
                login: {
                    name: 'login',
                    type: GraphQLString,
                },
                password: {
                    name: 'password',
                    type: GraphQLString,
                },
            },
            resolve: signInUser,
        },
    },
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
