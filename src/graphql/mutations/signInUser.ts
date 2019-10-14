import { GraphQLString } from 'graphql';
import { signInUser } from '../resolvers/auth';
import UserType from '../types/user';

const signInUserMutation = {
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
};

export default signInUserMutation;
