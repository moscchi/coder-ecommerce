import fs from 'fs';

interface ContainerCarrito {
    ruta: string;
}

const contenedorCarritos = {
    ruta: `${process.env.DB_DIR_CARRITOS}`
}

const addCarrito = async ( contenedorCarritos: ContainerCarrito ) => {
    let carritos = JSON.parse(await fs.promises.readFile(contenedorCarritos.ruta, "utf-8"));
    let newId;
    !carritos.length ? newId = 1: newId=carritos[carritos.length - 1].id +1;
    const obj = { list: [], id: newId };
    carritos.push(obj);
    try {
        await fs.promises.writeFile(contenedorCarritos.ruta, JSON.stringify(carritos, null, 2));
        return obj;
    } catch (err) {
        throw new Error(`Error al intentar agregar carrito: ${err}`)
    }
}

const delCarritoById = async (contenedorCarritos: ContainerCarrito, id: number) => {
    try {
        let carritos = JSON.parse(await fs.promises.readFile(contenedorCarritos.ruta, "utf-8"));
        carritos.filter((i:any) => i.id !== id);
        await fs.promises.writeFile(contenedorCarritos.ruta, "utf-8");
        return carritos;
    } catch (e) {
        console.log(e);
    }
}

const getById = async (contenedorCarritos: ContainerCarrito, id: number) => {
    try {
        let carritos = JSON.parse(await fs.promises.readFile(contenedorCarritos.ruta, "utf-8")); 
        let carr = carritos.filter((obj: any) => obj.id === id);
        if(!carr.length) return { error: "Carrito no encontrado"};
        return carr;
    } catch (err){
        console.log(err);
        
    }
}

const addProduct = async (contenedorCarritos: ContainerCarrito, id: number, producto: any) => {
    let carritos = JSON.parse(await fs.promises.readFile(contenedorCarritos.ruta, "utf-8")); 
    let carr = carritos.filter((obj: any) => obj.id === id);
    carr.list.push(producto);
    await delCarritoById(contenedorCarritos, id);
    carritos.push(carr);
    carritos.sort((a: any, b: any) => { return a.id - b.id});
    try {
        await fs.promises.writeFile(contenedorCarritos.ruta, JSON.stringify(carritos, null, 2));
        return carritos;
    } catch (err) {
        throw new Error(`Error al cargar el producto: ${err}`);
    }
    
}

//Falta agregar el ultimo route

export { addCarrito, delCarritoById, getById, addProduct, contenedorCarritos };