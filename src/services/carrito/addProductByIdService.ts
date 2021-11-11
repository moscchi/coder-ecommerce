import { getProductByIdService } from '../products/getProductByIdService';
import { contenedorCarritos, addProduct } from '../../utils/ContainerCarrito';
import { Request } from 'express';
const addProductByIdService = async (req: Request) => {
    const { id } = req.params;
    const { id_prod } = req.body;
    const mockReq = {
        params: {
            id_prod
        }
    }
    try {
        //@ts-ignore
        const product = await  getProductByIdService(mockReq);
        const carrito = await addProduct(contenedorCarritos, parseInt(id), product);
        return carrito;
    } catch (e){
        console.log(e);
    }
}

export { addProductByIdService };