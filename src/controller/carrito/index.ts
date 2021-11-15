import { Request, Response, NextFunction } from 'express';
import { addCarritoService } from '../../services/carrito/addCarritoService';
import { delCarritoByIdService } from '../../services/carrito/delCarritoByIdService';
import { getCarritoByIdService } from '../../services/carrito/getCarritoService';
import { addProductByIdService } from '../../services/carrito/addProductByIdService'
import { removeProductService } from '../../services/carrito/removeProductService';
const addCarrito = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const newCarrito = await addCarritoService();
        res.json(newCarrito);
    } catch (e){
        next(e);
    }
};

const delCarrito = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await delCarritoByIdService(req);
        res.json({ message: `Carrito id=${req.params.id} eliminado con éxito!`});
    } catch (e){
        next(e);
    }
};
const listCarrito = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const getCarrito = await getCarritoByIdService(req);
        res.json(getCarrito);
    } catch (e) {
        next(e);
    }
};
const addProductCarrito = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const carritoWithNewProduct = await addProductByIdService(req);
        res.json(carritoWithNewProduct);
    } catch (e) {
        next(e);
    }
};
const delProdCarrito = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const removeProdForCarrito = await removeProductService(req);
        res.json(removeProdForCarrito);
    } catch(e){
        next(e);
    }
};

export {
    addCarrito,
    delCarrito,
    listCarrito,
    addProductCarrito,
    delProdCarrito
}