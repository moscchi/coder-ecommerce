import { Request } from 'express';
import { ProductosModel } from '../../models/products/products.models';

const addProductService = async (req: Request) => {
  const producto = await ProductosModel.find().sort({id_car:-1}).limit(1);
  let { id_prod } = producto[0];
  const { title, price, thumbnail, admin, description, stock } = req.body;
  if(admin == 1){
    const hoy = new Date();
    const obj = {
      title,
      price,
      thumbnail,
      id_prod: ++id_prod,
      timestamp: hoy.toLocaleString(),
      description,
      stock
    };
    const newProduct = ProductosModel.create(obj);
    return obj;
  } else {
    return "Acceso denegado.";
  }
};
export {addProductService};