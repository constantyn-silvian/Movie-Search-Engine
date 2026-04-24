import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Acces refuzat! Nu ești logat." })
    }
    try {
        const key = process.env.JWT_SECRET || 'parola_criptare'
        const verified = jwt.verify(token, key);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(401).json({ success: false, message: "Token invalid sau expirat!" })
    }
}