import { Document, Schema, Model, model } from 'mongoose';

export interface IUser {
    login: string;
    password: string;
}

interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({ login: String, password: String });

const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);

export default User;
