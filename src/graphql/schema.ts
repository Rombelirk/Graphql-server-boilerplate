import { GraphQLList, GraphQLObjectType, GraphQLSchema } from 'graphql';
import User from '../models/user';
import createUser from './mutations/createUser';
import signInUser from './mutations/signInUser';
import UserType from './types/user';

const RootQuery = new GraphQLObjectType({
        name: 'RootQuery',
        fields: {
            getAllUsers: {
                type: new GraphQLList(UserType),
                resolve: () => User.find({}),
            },
        },
    }),
    RootMutation = new GraphQLObjectType({
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
