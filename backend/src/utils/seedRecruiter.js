"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRecruiterUser = void 0;
const RegisterModel_1 = require("../models/RegisterModel");
const argon2_1 = __importDefault(require("argon2"));
const seedRecruiterUser = async () => {
    const recruiterUsername = 'recruiter';
    const recruiterPassword = 'recruiter123';
    const recruiterDOB = new Date('1990-01-01');
    try {
        // Check if recruiter user already exists
        const existingRecruiter = await RegisterModel_1.register.findOne({ username: recruiterUsername }).exec();
        if (existingRecruiter) {
            console.log('Recruiter user already exists');
            return;
        }
        // Hash the password
        const hashedPassword = await argon2_1.default.hash(recruiterPassword);
        // Create recruiter user
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
exports.seedRecruiterUser = seedRecruiterUser;
