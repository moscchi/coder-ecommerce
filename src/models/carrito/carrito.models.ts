import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    id_car: { type: Number},
    list: { type: Array}
});

export const CarritosModel = mongoose.model('Carritos', Schema);