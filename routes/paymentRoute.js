import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import paymentController from '../controllers/paymentController.js';
import path from 'path'; // Import the path module

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const payment_route = express();

payment_route.use(bodyParser.json());
payment_route.use(bodyParser.urlencoded({ extended: false }));

payment_route.set('view engine', 'ejs');
payment_route.set('views', path.join(__dirname, '../views'));

payment_route.get('/', paymentController.renderBuyPage);
payment_route.post('/pay', paymentController.payProduct);
payment_route.get('/success', paymentController.successPage);
payment_route.get('/cancel', paymentController.cancelPage);

export default payment_route;
