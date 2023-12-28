"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
let authController = require('../controller/AuthenticationController');
exports.authRoute = (0, express_1.Router)();
exports.authRoute.post("/register", authController.registerUser);
exports.authRoute.post("/login", authController.loginUser);
