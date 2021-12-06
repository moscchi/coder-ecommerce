import { CarritosModel } from "../../models/carrito/carrito.models";
import { Request } from "express";

const removeProductService = async (req: Request) => {
    const { id, id_prod } = req.params;
    const carrito = await CarritosModel.findOne({id_car: Number(id)});
    console.log(carrito);
    let { list } = carrito;
    list = list.filter((obj: any) => obj.id_prod != id_prod);
    console.log(list);
    const obj = {
        id_car: Number(id),
        list
    }
    const newC = await CarritosModel.updateOne({id_car: Number(id)}, obj);
    return newC;
}

export {removeProductService};