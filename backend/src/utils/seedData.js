"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedData = void 0;
const RegisterModel_1 = require("../models/RegisterModel");
const argon = __importStar(require("argon2"));
const seedData = async () => {
    const recruiterUsername = 'recruiter';
    const recruiterPassword = 'recruiter123';
    const recruiterDOB = new Date('1990-01-01');
    try {
        const existingRecruiter = await RegisterModel_1.register.findOne({ username: recruiterUsername }).exec();
        if (existingRecruiter) {
            console.log('Recruiter user already exists');
            return;
        }
        const hashedPassword = await argon.hash(recruiterPassword);
        const recruiter = new RegisterModel_1.register({
            username: recruiterUsername,
            password: hashedPassword,
            dateofbirth: recruiterDOB
        });
        await recruiter.save();
        console.log('Recruiter user seeded successfully');
    }
    catch (error) {
        console.error('Error seeding recruiter user:', error.message);
    }
};
exports.seedData = seedData;
