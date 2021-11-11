import { Request, Response, NextFunction } from 'express';

import {getProductByIdService} from '../../services/products/getProductByIdService';
import {addProductService} from "../../services/products/addProductService";
import {updateProductService} from "../../services/products/updateProductService";
import {delByIdService} from "../../services/products/delByIdService";
import { getAllProductsService } from '../../services/products/getAllProductsService';

const getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const products = await getAllProductsService();
    res.json(products);
  } catch (error){
    next(error);
  }
}
const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const product = await getProductByIdService(req);
    res.json(product);
  } catch (error) {
      next(error);
  }
};

const addProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const newProduct = await addProductService(req);
    res.json(newProduct);
  } catch (error) {
      next(error);
  }
};

const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const updateProduct = await updateProductService(req);
    res.json(updateProduct);
  } catch (error) {
      next(error);
  }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const deleteProduct = await delByIdService(req);
    res.json(deleteProduct);
  } catch (error) {
      next(error);
  }
};

export {
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts
};