import db from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


export const registerUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const values = [username, hashedPassword];
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username';
    // console.log('test if workking')
    try {
        const res = await db.query(query, values);
        return { success: true, user: res.rows[0] };
    }
    catch (err) {
        if (err.code == 23505) {
            return { success: false, message: "Utilizatorul exista deja" };
        }
        throw err;
    }
}

export const login = async (username, password) => {
    const sql = "SELECT * FROM users WHERE username = $1"
    try {
        const res = await db.query(sql, [username])
        if (res.rows.length === 0) return { success: false, message: "User negăsit!" }

        const user = res.rows[0]
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return { success: false, message: "Parolă incorectă!" }

        const secretKey = process.env.JWT_SECRET || 'parola_criptate'
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '100h' })
        return { success: true, token, user: { id: user.id, username: user.username } }
    }
    catch (err) {
        throw err;
    }
}