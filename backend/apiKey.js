import dotenv from 'dotenv';
dotenv.config();

export const api_key = process.env.API_KEY || "Bearer "; // Paste API key after Bearer; Ex: Bearer 12345678