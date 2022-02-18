import express from "express";
import passport from 'passport';
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
import { getRegister, postRegister, getFailregister, getLogin, postLogin, getFaillogin, getLogout } from '../controller/auth';

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

/*
*   Rutas de auth
*/

// REGISTRO
routes.get("/registro", getRegister);
routes.post("/registro", passport.authenticate('signup', { failureRedirect: '/failregister'}), postRegister);
routes.get("/failregister", getFailregister);

// LOGIN
routes.get('/login', getLogin);
routes.post('/login', passport.authenticate('signin', { failureRedirect: '/faillogin'}), postLogin);
routes.get('/faillogin', getFaillogin);

// LOGOUT
routes.get('/logout', getLogout);

export default routes;