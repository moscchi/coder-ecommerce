import { save, contenedor } from "../../utils/ContainerProducts";
import { Request } from 'express';

const addProductService = async (req: Request) => {
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
};

export {addProductService};