import { save, contenedor } from "../../utils/ContainerProducts";
import { Request } from 'express';

const addProductService = async (req: Request) => {
  const { title, price, thumbnail, admin } = req.body;
  if(admin == 1){
    const obj = {
      title,
      price,
      thumbnail,
        id: 0,
    };
    const newProduct = await save(contenedor, obj);
    return newProduct;
  } else {
    return "Acceso denegado.";
  }
};

export {addProductService};