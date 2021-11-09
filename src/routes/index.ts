import express from "express";
import {
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controller/products/index";

const routes = express.Router();

routes.get("/productos/:id", getProductById);
routes.post("/productos", addProduct);
routes.put("/productos/:id", updateProduct);
routes.delete("/productos/:id", deleteProduct);

export default routes;