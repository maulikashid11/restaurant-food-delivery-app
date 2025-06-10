import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        const alreadyRegister = await User.findOne({ email });
        if (alreadyRegister) {
            res.json({ success: false, message: "Email already registered." });
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const user = await User.create({
                    name, email, password: hash
                })

                const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET);
                res.cookie('token', token);
                res.json({ success: true, message: "User registered successfully.",user })
            })
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {


        const user = await User.findOne({ email });
        if (!user) {
            res.json({ success: false, message: "Something went wrong." });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET);
                res.cookie('token', token);
                res.json({ success: true, message: "User logged in successfully", user })
            }
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('token', '');
        res.json({ success: true, message: "Logged out successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getUser = async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
        res.json({ success: false, message: "Something went wrong" });
    }
    res.json({ success: true, message: "User get successfully", user })
}