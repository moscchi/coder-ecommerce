import { save, contenedor } from "../../utils/Container";

const addProductService = async (req: any) => {
  const { title, price, thumbnail } = req.body;
  const obj = {
    title,
    price,
    thumbnail,
    id: 0,
  };
  const newProduct = await save(contenedor, obj);
  return newProduct;
};

export {addProductService};