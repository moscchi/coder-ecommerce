import { getById, contenedor } from "../../utils/ContainerProducts";
import { Request } from 'express';
const getProductByIdService = async (req: Request) => {
  const { id } = req.params;
  const product = await getById(contenedor, parseInt(id));
  return product;
};

export {getProductByIdService};