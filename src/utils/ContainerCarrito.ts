import fs from 'fs';
import {contenedor, getById as getProduct} from './ContainerProducts';

interface ContainerCarrito {
    ruta: string;
}

const contenedorCarritos = {
    ruta: `${process.env.DB_DIR_CARRITOS}`
}

const addCarrito = async ( contenedorCarritos: ContainerCarrito ) => {
    const carritos = await fs.promises.readFile(contenedorCarritos.ruta, "utf-8");
    const carritosParsed = JSON.parse(carritos)
    let newId;
    !carritosParsed.length ? newId = 1: newId=carritosParsed[carritosParsed.length - 1].id +1;
    const obj = { list: [], id: newId };
    carritosParsed.push(obj);
    try {
        await fs.promises.writeFile(contenedorCarritos.ruta, JSON.stringify(carritosParsed, null, 2));
        return obj;
    } catch (err) {
        throw new Error(`Error al intentar agregar carrito: ${err}`)
    }
}

const delCarritoById = async (contenedorCarritos: ContainerCarrito, id: string) => {
    try {
        const carritos = await fs.promises.readFile(contenedorCarritos.ruta, "utf-8");
        const carritosParsed = JSON.parse(carritos)
        const carritosFilter = carritosParsed.filter((i:any) => i.id !== parseInt(id));
        await fs.promises.writeFile(contenedorCarritos.ruta, JSON.stringify(carritosFilter, null, 2));
        return carritosParsed;
    } catch (err) {
        throw new Error(`Error al intentar agregar carrito: ${err}`)
    }
}

const getById = async (contenedorCarritos: ContainerCarrito, id: number) => {
    try {
        const carritos = await fs.promises.readFile(contenedorCarritos.ruta, "utf-8");
        const carritosParsed = JSON.parse(carritos)
        let carr = carritosParsed.filter((obj: any) => obj.id === id);
        if(!carr.length) return { error: "Carrito no encontrado"};
        return carr;
    }catch (err) {
        throw new Error(`Error al intentar agregar carrito: ${err}`)
        
    }
}

const addProduct = async (contenedorCarritos: ContainerCarrito, id: string, id_prod: any) => {
    try {
        const carritos = await fs.promises.readFile(contenedorCarritos.ruta, "utf-8");
        const carritosParsed = JSON.parse(carritos)
        await delCarritoById(contenedorCarritos, id);
        let carr = carritosParsed.filter((obj: any) => obj.id === parseInt(id));
        const producto = await getProduct(contenedor, id_prod);
        carr[0].list.push(producto[0]);
        carritosParsed.sort((a: any, b: any) => { return a.id - b.id});
        await fs.promises.writeFile(contenedorCarritos.ruta, JSON.stringify(carritosParsed, null, 2));
        return carritosParsed;
    } catch (err) {
        throw new Error(`Error al cargar el producto: ${err}`);
    }
    
}


const  removeProduct = async (contenedorCarritos:ContainerCarrito, id: string, id_prod: string) => {
    try{
        let carritos = await fs.promises.readFile(contenedorCarritos.ruta, "utf-8");
        let carritosParsed = JSON.parse(carritos);
        const carr = carritosParsed.filter((obj: any) => obj.id === parseInt(id));
        const listProduct = carr[0].list.filter((obj: any) => obj.id != id_prod);
        await delCarritoById(contenedorCarritos, id);
        carritos = await fs.promises.readFile(contenedorCarritos.ruta, "utf-8");
        carritosParsed = JSON.parse(carritos);
        const obj = { id, list: listProduct };
        carritosParsed.push(obj);
        carritosParsed.sort((a: any, b: any) => { return a.id - b.id});
        await fs.promises.writeFile(contenedorCarritos.ruta, JSON.stringify(carritosParsed, null, 2));
        return obj;
    } catch (err) {
        throw new Error(`Error al querer eliminar el producto: ${err}`);
    }
}
export { addCarrito, delCarritoById, getById, addProduct, removeProduct, contenedorCarritos };