const bcrypt = require('bcryptjs');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: 'Email already in use' });

        const hashed = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashed, role });
        const savedUser = await user.save()
        const token = await savedUser.createJWT();

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(Date.now() + 7 * 24 * 3600000)
        });

        res.status(201).json({ msg: 'User created successfully', savedUser });
    } catch (err) {
        res.status(500).json({ msg: 'Signup failed', error: err.message });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = await user.createJWT();
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(Date.now() + 7 * 24 * 3600000)
        });
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: 'Login failed', error: err.message });
    }
};
exports.logout = (req, res) => {
    res
        .clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })
        .json({ msg: 'Logged out successfully' });
};