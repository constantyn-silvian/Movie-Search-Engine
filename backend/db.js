import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: 'movie-engine',
    host: 'localhost',  
    database: 'movie-engine_db',
    password: process.env.DB_PASSWORD || "password",
    port: 5432,
});

const initializeDB = async () => {
    const querydb = `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    )`;
    const querymovies = `CREATE TABLE IF NOT EXISTS movies (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        movie_id INTEGER NOT NULL,
        movie_data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, movie_id)
    )`;
    try {
        await pool.query(querydb);
        await pool.query(querymovies);
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};
initializeDB();
export default pool;