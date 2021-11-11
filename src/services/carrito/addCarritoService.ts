import {
    addCarrito,
    contenedorCarritos
} from '../../utils/ContainerCarrito'
const addCarritoService = async () => {
    const newC = await addCarrito(contenedorCarritos);
    return newC;
}

export { addCarritoService };