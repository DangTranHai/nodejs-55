import express from 'express';
import {userController} from '../controllers/user.controller.js';
const routerUser = express.Router();

routerUser.post('/order', userController.createOrder);
routerUser.get('/orders/:userId', userController.getOrdersByUserId);

export default routerUser;