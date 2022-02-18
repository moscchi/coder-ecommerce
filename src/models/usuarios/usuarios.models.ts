import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    avatar: { type: String },
    id_usuario: { type: Number },
    register_date: { type: String },
    name: { type: String },
    lastname: { type: String },
    email: { type: String}
});

export const UsuariosModel = mongoose.model('Usuarios', Schema);