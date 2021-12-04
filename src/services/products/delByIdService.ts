import { ProductosModel } from '../../models/products/products.models';
import { Request } from 'express';

const delByIdService = async (req: Request) => {
  const { id } = req.params;
  const { admin } = req.body;
  if(admin == 1){
    const products = await ProductosModel.deleteOne({id_prod: Number(id)});
    return products;
  }else {
    return "Acceso denegado";
  };
}

export {delByIdService};