import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'MiSuperSecretoUltraSeguro1234!';

// Extender `Request` para incluir `user`
interface AuthRequest extends Request {
    user?: JwtPayload | string; // El token puede ser un objeto JwtPayload o un string
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extrae el token del header

    if (!token) {
        res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded !== 'object' || !decoded) {
            res.status(403).json({ error: 'Token inválido' });
            return;
        }

        req.user = decoded; // Guardamos el usuario en la request
        next();
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            res.status(403).json({ error: 'El token ha expirado' });
        } else {
            res.status(403).json({ error: 'Token inválido' });
        }
    }
};

