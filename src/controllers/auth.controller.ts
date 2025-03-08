
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserAdmin from '../models/userAdmin.model';

import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'MiSuperSecretoUltraSeguro1234!';


// Registro de usuario administrador
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        // Verificar si el usuario ya existe en UserAdmin
        const existingUser = await UserAdmin.findOne({ username });
        if (existingUser) {
            res.status(400).json({ error: 'El administrador ya existe' });
            return;
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generar token JWT
        const token = jwt.sign({ username }, JWT_SECRET );

        // Encriptar el token antes de guardarlo (opcional)
        const hashedToken = await bcrypt.hash(token, 10);

        // Crear nuevo usuario administrador
        const newUserAdmin = new UserAdmin({ username, password: hashedPassword, token: hashedToken });
        await newUserAdmin.save();

        res.status(201).json({ message: 'Administrador registrado exitosamente', newUserAdmin });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar administrador' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        // Buscar administrador en MongoDB
        const admin = await UserAdmin.findOne({ username });
        if (!admin) {
            res.status(401).json({ error: 'Administrador no encontrado' });
            return;
        }

        // Comparar contraseñas
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            res.status(401).json({ error: 'Contraseña incorrecta' });
            return;
        }

        // Generar un nuevo token JWT
        const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};



