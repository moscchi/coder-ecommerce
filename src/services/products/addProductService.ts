import { Request } from 'express';
import { ProductosModel } from '../../models/products/products.models';
let id = 0;
/* const addProductService = async (req: Request) => {
  const { title, price, thumbnail, admin, description, stock } = req.body;
  if(admin == 1){
    const hoy = new Date();
    const obj = {
      title,
      price,
      thumbnail,
      id: 0,
      timestamp: hoy.toLocaleString(),
      description,
      stock
    };
    const newProduct = await save(contenedor, obj);
    return newProduct;
  } else {
    return "Acceso denegado.";
  }
}; */
const addProductService = async (req: Request) => {
  const { title, price, thumbnail, admin, description, stock } = req.body;
  if(admin == 1){
    const hoy = new Date();
    const obj = {
      title,
      price,
      thumbnail,
      id_prod: ++id,
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