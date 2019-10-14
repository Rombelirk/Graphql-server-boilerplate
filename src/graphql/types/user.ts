import { GraphQLObjectType, GraphQLString } from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        login: { type: GraphQLString },
    }),
});

export default UserType;
