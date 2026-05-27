const User = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ msg: "username, email and password are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashed });
        const safeUser = { id: newUser._id, username: newUser.username, email: newUser.email };

        res.status(201).json({ msg: "User registered successfully", user: safeUser });
    } catch (err) {
        console.error("Register failed:", err);
        res.status(500).json({ msg: "Server error while registering user" });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "email and password are required" });
        }
        if (!JWT_SECRET) {
            return res.status(500).json({ msg: "JWT_SECRET is not configured" });
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        console.error("Login failed:", err);
        res.status(500).json({ msg: "Server error while logging in" });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error("Get profile failed:", err);
        res.status(500).json({ msg: "Server error while fetching profile" });
    }
};
