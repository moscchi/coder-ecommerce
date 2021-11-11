import { delCarritoById, contenedorCarritos } from '../../utils/ContainerCarrito';
import { Request } from 'express';

const delCarritoByIdService = async (req: Request) => {
    const { id } = req.params;
    const carritos = await delCarritoById(contenedorCarritos, parseInt(id));
    return carritos;
}

export { delCarritoByIdService };