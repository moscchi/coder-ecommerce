import { CarritosModel } from '../../models/carrito/carrito.models';

const addCarritoService = async () => {
    const carrito = await CarritosModel.find().sort({id_car:-1}).limit(1);
    let { id_car } = carrito[0];
    const obj = {
        id_car: ++id_car,//( id_car < 1 ? 1 : { $inc: { quantity: +1}}),
        list: []
    }
    const newC = await CarritosModel.create(obj);
    return newC;
}

export { addCarritoService };