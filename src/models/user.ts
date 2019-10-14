import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    login: string;
    password: string;
}

const UserSchema = new mongoose.Schema({ login: String, password: String });

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
