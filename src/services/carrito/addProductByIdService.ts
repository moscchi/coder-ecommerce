import { contenedorCarritos, addProduct } from '../../utils/ContainerCarrito';
import { Request } from 'express';
const addProductByIdService = async (req: Request) => {
    const { id } = req.params;
    const { id_prod } = req.body;
    try {
        const carrito = await addProduct(contenedorCarritos, id, id_prod);
        return carrito;
    } catch (e){
        console.log(e);
    }
}

export { addProductByIdService };