import { update, contenedor } from "../../utils/ContainerProducts"
import { Request } from 'express';

const updateProductService = async (req: Request) => {
  console.log("BODY", req.body);
  const { admin, title, price, thumbnail } = req.body;
  const { id } = req.params;
  const elId = parseInt(id);
  if(admin == 1){
    const obj = {
      title,
      price,
      thumbnail,
      id: elId,
    };
    const newProduct = await update(contenedor, obj);
    return newProduct;
  } else {
    return "Acceso denegado";
  }
};

export {updateProductService};