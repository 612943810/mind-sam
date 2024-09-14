"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const RegisterModel_1 = require("../models/RegisterModel");
let secretKey = process.env.JWT_SECRET;
let registerUser = async (req, res) => {
    const { username, password, dateofbirth } = req.body;
    let users = new RegisterModel_1.register({ username: username, password: password, dateofbirth: dateofbirth });
    try {
        await users.save();
        const jwtToken = jsonwebtoken_1.default.sign({ username: username, password: password, dateofbirth }, secretKey, {
            expiresIn: "15m",
        });
        res.send("User Registered");
    }
    catch (error) {
        res.json(error);
    }
};
let loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        let appUsers = 0;
        appUsers = await RegisterModel_1.register.findOne({ username: username, password: password }).exec();
        console.log(appUsers);
        if (appUsers) {
            const jwtToken = jsonwebtoken_1.default.sign({ username: username, password: password }, secretKey, { expiresIn: "15m" });
            res.json({ "result": "Success" });
        }
        else if (appUsers == null) {
            res.json({ "result": "User not found" });
        }
    }
    catch (error) {
        console.log(error);
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
