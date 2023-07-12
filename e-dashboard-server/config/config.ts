import dotenv from 'dotenv';

dotenv.config();
const DB_URL='mongodb+srv://hathi:anthuY123@e-commercial.ikzzwwc.mongodb.net/?retryWrites=true&w=majority';
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000;
const JWT_KEY = process.env.JWT_KEY ?  process.env.JWT_KEY: 'e-commercial';
const config = {
    mongo: {
        url: DB_URL
    },
    server: {
        port: SERVER_PORT
    },
    jwt: {
        key: JWT_KEY
    }
};
export default config;