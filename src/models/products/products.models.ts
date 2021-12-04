import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    title: { type: String },
    price: { type: Number },
    thumbnail: { type: String },
    id_prod: { type: Number },
    timestamp: { type: String },
    description: { type: String },
    stock: { type: Number }
});

export const ProductosModel = mongoose.model('Productos', Schema);