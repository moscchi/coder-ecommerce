import fs from 'fs';

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
        const carritosFilter = carritosParsed.filter((i:any) => i.id != id);
        await fs.promises.writeFile(contenedorCarritos.ruta, JSON.stringify(carritosFilter, null, 2));
        return carritosParsed;
    } catch (e) {
        console.log(e);
    }
}

const getById = async (contenedorCarritos: ContainerCarrito, id: number) => {
    try {
        const carritos = await fs.promises.readFile(contenedorCarritos.ruta, "utf-8");
        const carritosParsed = JSON.parse(carritos)
        let carr = carritosParsed.filter((obj: any) => obj.id === id);
        if(!carr.length) return { error: "Carrito no encontrado"};
        return carr;
    } catch (err){
        console.log(err);
        
    }
}

const addProduct = async (contenedorCarritos: ContainerCarrito, id: string, producto: any) => {
    const carritos = await fs.promises.readFile(contenedorCarritos.ruta, "utf-8");
    const carritosParsed = JSON.parse(carritos)
    const carr = carritosParsed.filter((obj: any) => obj.id === id);
    const list = [];
    /* revisar este metodo */
    carr.list.push(producto);
    await delCarritoById(contenedorCarritos, id);
    carritosParsed.push(carr);
    carritosParsed.sort((a: any, b: any) => { return a.id - b.id});
    try {
        await fs.promises.writeFile(contenedorCarritos.ruta, JSON.stringify(carritos, null, 2));
        return carritos;
    } catch (err) {
        throw new Error(`Error al cargar el producto: ${err}`);
    }
    
}

//Falta agregar el ultimo route
const  removeProduct = async (contenedorCarritos:ContainerCarrito, id: number, id_prod: number) => {
    const carritos = await fs.promises.readFile(contenedorCarritos.ruta, "utf-8");
    const carritosParsed = JSON.parse(carritos)
    const carr = carritosParsed.filter((obj: any) => obj.id === id);
    const carrProducto = carr.filter((obj: any) => obj.id !== id_prod);
    await fs.promises.writeFile(contenedorCarritos.ruta, JSON.stringify(carrProducto, null, 2));
    return carrProducto;
}
export { addCarrito, delCarritoById, getById, addProduct, removeProduct, contenedorCarritos };