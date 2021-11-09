import { deleteById, contenedor } from "../../utils/Container";

const delByIdService = async (req: any) => {
  const { id } = req.params;
  const products = await deleteById(contenedor, parseInt(id));
  return products;
};

export {delByIdService};