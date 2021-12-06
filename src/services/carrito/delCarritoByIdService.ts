import { CarritosModel } from '../../models/carrito/carrito.models';
import { Request } from 'express';

const delCarritoByIdService = async (req: Request) => {
    const { id } = req.params;
    const carritos = await CarritosModel.deleteOne({id_car: Number(id)})
    return carritos;
}

export { delCarritoByIdService };
