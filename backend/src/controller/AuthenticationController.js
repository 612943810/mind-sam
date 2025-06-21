"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const argon2_1 = __importDefault(require("argon2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const RegisterModel_1 = require("../models/RegisterModel");
let secretKey = process.env.JWT_SECRET;
let registerUser = async (req, res) => {
    const { username, password, dateofbirth } = req.body;
    try {
        const hashedPassword = await argon2_1.default.hash(password);
        let users = new RegisterModel_1.register({ username: username, password: hashedPassword, dateofbirth: dateofbirth });
        await users.save();
        const jwtToken = jsonwebtoken_1.default.sign({ username: username, dateofbirth }, secretKey, {
            expiresIn: "15m",
        });
        res.json({ result: "User Registered", token: jwtToken });
    }
    catch (error) {
        res.status(500).json({ result: "Error", error: error.message });
    }
};
let loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await RegisterModel_1.register.findOne({ username: username }).exec();
        if (!user) {
            return res.json({ result: "User not found" });
        }
        const validPassword = await argon2_1.default.verify(user.password, password);
        if (!validPassword) {
            return res.json({ result: "Invalid password" });
        }
        const jwtToken = jsonwebtoken_1.default.sign({ username: username }, secretKey, { expiresIn: "15m" });
        res.json({ result: "Success", token: jwtToken });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ result: "Error", error: error.message });
    }
};
let logoutUser = async (req, res) => {
    res.cookie("jwtToken", " ", { maxAge: 1 });
    res.json("Cookie Deleted");
};
module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
