import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    id_scord: string;
    username: string;
    password: string; 
    name: string;
    surname: string;
    email: string;
    celular: string[];
    createdAt: Date; // Fecha de creación
    updatedAt: Date; // Fecha de modificación

}

const UserSchema: Schema = new Schema({
    id_cord: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    celular: { type: [String], required: true },
    
},{ timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);