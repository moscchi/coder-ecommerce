import { deleteById, contenedor } from "../../utils/ContainerProducts";
import { Request } from 'express';

const delByIdService = async (req: Request) => {
  const { id } = req.params;
  const { admin } = req.body;
  if(admin == 1){
    const products = await deleteById(contenedor, parseInt(id));
    return products;
  }else {
    return "Acceso denegado";
  };
}

export {delByIdService};