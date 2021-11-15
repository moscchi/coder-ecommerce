import express from "express";
import {
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts
} from "../controller/products/index";
import {
  addCarrito,
  delCarrito,
  listCarrito,
  addProductCarrito,
  delProdCarrito
} from '../controller/carrito/index'

const routes = express.Router();

/* Rutas producto */
routes.get("/productos", getAllProducts)
routes.get("/productos/:id", getProductById);
routes.post("/productos", addProduct);
routes.put("/productos/:id", updateProduct);
routes.delete("/productos/:id", deleteProduct);

/* Rutas Carrito */
routes.post("/carrito", addCarrito);
routes.delete("/carrito/:id", delCarrito);
routes.get("/carrito/:id/productos", listCarrito);
routes.post("/carrito/:id/productos", addProductCarrito);
routes.delete("/carrito/:id/productos/:id_prod", delProdCarrito);

export default routes;