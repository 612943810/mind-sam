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
let registerUser = async (req, res) => {
    const { username, password, dateofbirth } = req.body;
    let hashedPassword = await argon2_1.default.hash(password);
    let users = new RegisterModel_1.register({ username: username, password: hashedPassword, dateofbirth: dateofbirth });
    try {
        await users.save();
        let secretKey = process.env.JWT_SECRET;
        const jwtToken = jsonwebtoken_1.default.sign({ username: username, password: password, dateofbirth }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });
        res.send("User Registered");
    }
    catch (error) {
        res.json(error);
    }
};
module.exports = {
    registerUser
};
