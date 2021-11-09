import { getById, contenedor } from "../../utils/Container";

const getProductByIdService = async (req: any) => {
  const { id } = req.params;
  const product = await getById(contenedor, parseInt(id));
  return product;
};

export {getProductByIdService};