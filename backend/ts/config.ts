import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';

// Primary Mongo URI fallback strategy
const hasDatabaseNameAndPassword = Boolean(process.env.DATABASE_NAME && process.env.DATABASE_PASSWORD);
const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URI ||
  (hasDatabaseNameAndPassword
    ? `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_NAME}.yhrxz.mongodb.net/inventory?retryWrites=true&w=majority`
    : '');

if (!MONGO_URI) {
  throw new Error('Missing MONGO_URI or DATABASE_NAME/DATABASE_PASSWORD in environment variables.');
}

const JWT_SECRET = process.env.JWT_SECRET || 'please-change-this-secret';
const PORT = Number(process.env.PORT || 3001);
const NODE_TLS_REJECT_UNAUTHORIZED = process.env.NODE_TLS_REJECT_UNAUTHORIZED || '0';

export {
  NODE_ENV,
  MONGO_URI,
  JWT_SECRET,
  PORT,
  NODE_TLS_REJECT_UNAUTHORIZED,
};
