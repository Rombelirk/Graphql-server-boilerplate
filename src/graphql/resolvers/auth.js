const User = require('../../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: async (value, { login, password }) => {

        const existingUser = await User.findOne({ login: login });

        if (existingUser) {
            throw new Error('User exists already');
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({ login: login, password: hashedPassword });
        await user.save();
        return user;
    },

    async signInUser(value, { login, password }) {
        const user = await User.findOne({ login });
        if (!user) {
            throw new Error('User does not exist!');
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }

        const token = await jwt.sign(
            { userId: user.id, login: user.login },
            'somesupersecretkey',
            {
                expiresIn: '1h'
            }
        );

        return token;
    }
}