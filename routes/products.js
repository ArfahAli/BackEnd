import express from 'express';
import {   getProductById, getProducts, postProduct } from '../controllers/product.js';
import { upload } from '../multer_config/multer_config.js';

const productRouter = express.Router();


productRouter.get('/', getProducts);
productRouter.post('/', postProduct);
productRouter.get('/:id', getProductById);

// ,upload.single('image')
export default productRouter;

