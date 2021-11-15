import fs from "fs";

interface ContainerProducts {
    ruta: string;
  }
  
  const contenedor = {
    ruta: `${process.env.DB_DIR}`
}

  const getAll = async (contenedor: ContainerProducts) => {
    let objs = await fs.promises.readFile(contenedor.ruta, "utf-8");
    let objsParsed = JSON.parse(objs);
    return objsParsed;
  }
  const getById = async (contenedor: ContainerProducts, id: number) => {
    try {
      let objs = await fs.promises.readFile(contenedor.ruta, "utf-8");
      let objsParsed = JSON.parse(objs);
      let byId = objsParsed.filter((obj: any) => obj.id === id); 
      if(!byId.length) return { error: 'Producto no encontrado'};
      return byId;
    } catch (err) {
      console.log(err);
    }
  }

  const save = async (contenedor: ContainerProducts, objes: object) => {
    let objs = await fs.promises.readFile(contenedor.ruta, "utf-8");
    let objsParsed = JSON.parse(objs);
    let newId;
    if (!objsParsed.length) {
      newId = 1;
    } else {
      newId = objsParsed[objsParsed.length - 1].id + 1;
    }
    const objeto = { ...objes, id: newId };
    objsParsed.push(objeto);
    try {
      await fs.promises.writeFile(contenedor.ruta, JSON.stringify(objsParsed, null, 2));
      return objeto;
    } catch (err) {
      throw new Error(`Error al guardar: ${err}`);
    }
  }

  const deleteById = async (contenedor: ContainerProducts, id: number) => {
    try {
      let objs = await fs.promises.readFile(contenedor.ruta, "utf-8");
      let objsParsed = JSON.parse(objs);
      objsParsed = objsParsed.filter((i: any) => i.id !== id);
      await fs.promises.writeFile(contenedor.ruta, JSON.stringify(objsParsed));
      return objsParsed;
    } catch (err) {
      console.log(err);
    }
  }
  const update = async (contenedor: ContainerProducts, obj: {
    title: string,
    price: number,
    thumbnail: string,
    id: number,
  }) => {
    const { id } = obj;
    let objs = await fs.promises.readFile(contenedor.ruta, "utf-8");
    let objsParsed = JSON.parse(objs);
    let byId = objsParsed.filter((obj: any) => obj.id === id);
    if(byId.length == 0) return 'Producto no encontrado';
    await deleteById(contenedor, id);
    objsParsed.push(obj);
    objsParsed.sort((a: any, b: any)=> {return a.id - b.id}); 
    try {
      await fs.promises.writeFile(contenedor.ruta, JSON.stringify(objsParsed, null, 2));
      return objsParsed;
    } catch (err) {
      throw new Error(`Error al guardar: ${err}`);
    }
  }



export { getById, save, deleteById, update, getAll, contenedor };