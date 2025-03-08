import mongoose, { Schema, Document } from 'mongoose';

interface ISession extends Document {
    id_user: mongoose.Schema.Types.ObjectId; // ObjectId de User
    channel: string;
    id_provider: string;
    createdAt: Date; // Fecha de creación
    updatedAt: Date; // Fecha de modificación
}

const SessionSchema: Schema = new Schema({
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia a User
    channel: { type: String, required: true },
    id_provider: { type: String, required: true, unique: true },
},{ timestamps: true });

export default mongoose.model<ISession>('Session', SessionSchema);

