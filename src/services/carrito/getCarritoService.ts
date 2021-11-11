import { getById, contenedorCarritos } from "../../utils/ContainerCarrito";
import { Request } from "express";

const getCarritoByIdService = async (req: Request) => {
    const { id } = req.params;
    const carrito = await getById(contenedorCarritos, parseInt(id));
    return carrito;
}

export { getCarritoByIdService };