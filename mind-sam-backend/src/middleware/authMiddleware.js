"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let jwtToken = process.env.JWT_SECRET;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let verifyAuth = (req, res, next) => {
    let storeHeader = req.headers.authorization;
    if (storeHeader) {
        const modToken = storeHeader.split('')[1];
        jsonwebtoken_1.default.verify(modToken, jwtToken, (error, accountUser) => {
            if (error) {
                return res.status(403).send("TThis is not  a valid token.");
            }
        });
    }
};
