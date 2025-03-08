import mongoose, { Schema, Document } from 'mongoose';

export interface IUserAdmin extends Document {
    username: string;
    password: string;
    token: string;
    createdAt: Date; // Fecha de creación
    updatedAt: Date; // Fecha de modificación
}

const UserAdminSchema = new Schema<IUserAdmin>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, required: true }
},{ timestamps: true });

export default mongoose.model<IUserAdmin>('UserAdmin', UserAdminSchema);
