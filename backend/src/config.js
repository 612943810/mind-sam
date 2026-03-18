"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_TLS_REJECT_UNAUTHORIZED = exports.PORT = exports.JWT_SECRET = exports.MONGO_URI = exports.NODE_ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const NODE_ENV = process.env.NODE_ENV || 'development';
exports.NODE_ENV = NODE_ENV;
// Primary Mongo URI fallback strategy
const hasDatabaseNameAndPassword = Boolean(process.env.DATABASE_NAME && process.env.DATABASE_PASSWORD);
const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URI ||
    (hasDatabaseNameAndPassword
        ? `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_NAME}.yhrxz.mongodb.net/inventory?retryWrites=true&w=majority`
        : '');
exports.MONGO_URI = MONGO_URI;
if (!MONGO_URI) {
    throw new Error('Missing MONGO_URI or DATABASE_NAME/DATABASE_PASSWORD in environment variables.');
}
const JWT_SECRET = process.env.JWT_SECRET || 'please-change-this-secret';
exports.JWT_SECRET = JWT_SECRET;
const PORT = Number(process.env.PORT || 3001);
exports.PORT = PORT;
const NODE_TLS_REJECT_UNAUTHORIZED = process.env.NODE_TLS_REJECT_UNAUTHORIZED || '0';
exports.NODE_TLS_REJECT_UNAUTHORIZED = NODE_TLS_REJECT_UNAUTHORIZED;
