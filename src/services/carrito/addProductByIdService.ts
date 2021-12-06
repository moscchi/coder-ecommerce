import { CarritosModel } from '../../models/carrito/carrito.models';
import { ProductosModel } from '../../models/products/products.models';
import { Request } from 'express';

const addProductByIdService = async (req: Request) => {
    const { id } = req.params;
    const { id_prod } = req.body;
    const carrito = await CarritosModel.findOne({id_car: Number(id)});
    const product = await ProductosModel.findOne({id_prod: Number(id_prod)});
    const { list } = carrito;
    list.push(product);
    const obj = {
        id_car: Number(id),
        list
    }
    const newC = await CarritosModel.updateOne({id_car: Number(id)}, obj);
    return newC;
}

export { addProductByIdService };