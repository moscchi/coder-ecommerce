import fs from "fs";

interface Container {
    ruta: string;
  }
  console.log(process.env.DB_DIR);
  
  const contenedor = {
    ruta: `${process.env.DB_DIR}`
}
  const getById = async (contenedor: Container, id: number) => {
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

  const save = async (contenedor: Container, objes: object) => {
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

  const deleteById = async (contenedor: Container, id: number) => {
    try {
      let objs = await fs.promises.readFile(contenedor.ruta, "utf-8");
      let objsParsed = JSON.parse(objs);
      let byId: any;
      for (let i = 0; i < objsParsed.length; i++) {
        if (id === 1) {
          objsParsed.splice(0, 1);
          byId = objsParsed;
          break;
        }
        if (objsParsed[i].id == id) {
          objsParsed.splice(i, 1, id - 1);
          console.log('Aca en el delete: ',objsParsed);
          
          byId = objsParsed;
          break;
        }
        if (!byId) {
          byId = "El id no existe";
        }
      }
      if (typeof byId === "string") {
        return byId;
      } else {
        await fs.promises.writeFile(contenedor.ruta, JSON.stringify(byId));
        return byId;
      }
    } catch (err) {
      console.log(err);
    }
  }
  const update = async (contenedor: Container, obj: {
    title: string,
    price: number,
    thumbnail: string,
    id: number,
  }) => {
    const { id } = obj;
    await deleteById(contenedor, id);
    let objs = await fs.promises.readFile(contenedor.ruta, "utf-8");
    let objsParsed = JSON.parse(objs);
    //Aca hay que parsearlo poruqe sino te queda como string y te rompe el codigo del getById
    objsParsed.push(obj);
/*     console.log(objsParsed); */
    objsParsed.sort((a: any, b: any)=> {return a.id - b.id}); 
    console.log(objsParsed);
    try {
      await fs.promises.writeFile(contenedor.ruta, JSON.stringify(objsParsed, null, 2));
      return objsParsed;
    } catch (err) {
      throw new Error(`Error al guardar: ${err}`);
    }
  }



export { getById, save, deleteById, update, contenedor };