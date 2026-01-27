import express from 'express';
import authAdmin from '../middleware/authAdmin.js';
import { addProduct, editProduct, productList, removeProduct } from '../controller/productController.js';

const productRouter = express.Router();

productRouter.post("/add", authAdmin, addProduct);
productRouter.patch("/edit/:id", authAdmin, editProduct);
productRouter.delete("/delete/:id", authAdmin, removeProduct);
productRouter.get("/", authAdmin, productList);

export default productRouter;