import jwt from "jsonwebtoken";
import { User } from "../Model/model.js";
import bcrypt from "bcrypt";

export const registerMiddleware = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" });

        req.body.password = await bcrypt.hash(password, 10);
        next();
    } catch (error) {
        res.status(500).json({ message: "Register Middleware Error", error: error.message });
    }
};

export const loginMiddleware = async (req, res) => { // Next ki zaroorat nahi agar response yahin se bhej rahe hain
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User nahi mila, pehle register karein" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Ghalat password!" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ message: "Login Error", error: error.message });
    }
};