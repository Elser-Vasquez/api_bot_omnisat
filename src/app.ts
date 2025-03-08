import express from 'express';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes'; 
import connectDB from './config/database';
import { connectSQL } from './config/sqlDatabase';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan' 

dotenv.config();

const app = express();

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));   
app.use(express.json());
app.use(cors());

connectDB();

// Conectar a SQL Server
//connectSQL();


// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas protegidas (Ejemplo)
import { authenticateToken } from './middlewares/auth.middleware';

app.use('/api', userRoutes); // Protege todas las rutas bajo /api

export default app;




/*
{
    "id_user": "A1687667",
    "username": "joser@email.com",
    "password": "securepassword123",
    "name": "Joser",
    "surname": "Pérez Mendes",
    "email": "joser@example.com",
    "celular": [
        "+1234567890"
    ],
    "_id": "67cb53f13aa842d0f645ba02",
    "__v": 0
}

*/