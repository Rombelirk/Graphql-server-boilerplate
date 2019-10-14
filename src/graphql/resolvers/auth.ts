import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../../models/user';
import { GraphQLFieldResolver } from 'graphql';

interface IUserInput {
    login: string;
    password: string;
}

export const createUser: GraphQLFieldResolver<void, IUserInput> = async (_, args): Promise<IUser> => {
    const { login, password } = args;
    const existingUser = await User.findOne({ login });

    if (existingUser) {
        throw new Error('User exists already');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ login, password: hashedPassword });
    await user.save();
    return user;
};

export const signInUser: GraphQLFieldResolver<void, IUserInput> = async (_, args): Promise<string> => {
    const { login, password } = args;
    const user = await User.findOne({ login });
    if (!user) {
        throw new Error('User does not exist!');
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
        throw new Error('Password is incorrect!');
    }

    const token = await jwt.sign({ userId: user.id, login: user.login }, 'somesupersecretkey', {
        expiresIn: '1h',
    });

    return token;
};
