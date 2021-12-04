import { ProductosModel } from "../../models/products/products.models";
import { Request } from 'express';

const updateProductService = async (req: Request) => {
  const { admin, title, price, thumbnail, description, stock } = req.body;
  const { id } = req.params;
  const elId = parseInt(id);
  if(admin == 1){
    const hoy = new Date();
    const obj = {
      title,
      price,
      thumbnail,
      id: elId,
      timestamp: hoy.toLocaleString(),
      description,
      stock
    };
    const newProduct = await ProductosModel.updateOne({id_prod: Number(id)}, obj);
    return newProduct;
  } else {
    return "Acceso denegado";
  }
};

export {updateProductService};