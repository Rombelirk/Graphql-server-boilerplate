import { GraphQLString } from 'graphql';
import { createUser } from '../resolvers/auth';
import UserType from '../types/user';

const createUserMutation = {
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
};

export default createUserMutation;
