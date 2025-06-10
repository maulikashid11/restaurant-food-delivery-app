import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const isLoggedIn = async (req, res, next) => {
    const token = req.cookies.token
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email, _id: decoded.id });
        if (user) {
            req.user = user
            next()
        } else {
            res.json({ success: false, message: "Something went wrong" });
        }
    } else {
        res.json({ success: false, message: "Something went wrong" });
    }
}