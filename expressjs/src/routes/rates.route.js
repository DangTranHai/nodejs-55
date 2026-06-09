import express from 'express';
import {ratesController} from '../controllers/rates.controller.js';
const routerRates = express.Router();

routerRates.post('/rate', ratesController.addRate);
routerRates.get('/restaurant/:restaurantId', ratesController.getRatingByRestaurantId);
routerRates.get('/user/:userId', ratesController.getRatingByUserId);


export default routerRates;