import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import User from '../models/user';
import createUser from './mutations/createUser';
import signInUser from './mutations/signInUser';
import UserType from './types/user';

const AuthDataType = new GraphQLObjectType({
    name: 'AuthData',
    fields: () => ({
        token: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
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
    name: 'RootMutation',
    fields: {
        createUser,
        signInUser,
    },
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
