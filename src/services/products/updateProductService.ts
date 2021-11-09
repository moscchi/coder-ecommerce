import { update, contenedor } from "../../utils/Container"
import { Request } from 'express'

const updateProductService = async (req: Request) => {
    console.log("BODY", req.body);
    
  const { title, price, thumbnail, id } = req.body;
  const obj = {
    title,
    price,
    thumbnail,
    id,
  };
  console.log(obj);
  
  const newProduct = await update(contenedor, obj);
  return newProduct;
};

export {updateProductService};