import { ProductosModel } from "../../models/products/products.models";
import { Request } from 'express';
const getProductByIdService = async (req: Request) => {
  const { id } = req.params;
  const product = await ProductosModel.findOne({id_prod: Number(id)});
  return product;
};

export {getProductByIdService};