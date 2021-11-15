import { removeProduct, contenedorCarritos } from "../../utils/ContainerCarrito";
import { Request } from "express";

const removeProductService = async (req: Request) => {
    const { id, id_prod } = req.params;
    const carrito = await removeProduct(contenedorCarritos, id, id_prod);
    return carrito;
}

export {removeProductService};