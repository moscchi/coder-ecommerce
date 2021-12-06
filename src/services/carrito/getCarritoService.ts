import { CarritosModel } from '../../models/carrito/carrito.models';
import { Request } from "express";

const getCarritoByIdService = async (req: Request) => {
    const { id } = req.params;
    const carrito = await CarritosModel.findOne({id_car: Number(id)});
    return carrito;
}

export { getCarritoByIdService };