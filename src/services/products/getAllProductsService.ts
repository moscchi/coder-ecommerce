import { getAll, contenedor } from "../../utils/ContainerProducts";
const getAllProductsService = async () => {
    const product = await getAll(contenedor);
    return product;
}
export {getAllProductsService};