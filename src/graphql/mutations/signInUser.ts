import { GraphQLString } from 'graphql';
import { signInUser } from '../resolvers/auth';

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
