import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({ login: String, password: String });

const User = mongoose.model('User', UserSchema);

export default User;