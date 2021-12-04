import { ProductosModel } from "../../models/products/products.models";
const getAllProductsService = async () => {
    const product = await ProductosModel.find();
    return product;
}
export {getAllProductsService};