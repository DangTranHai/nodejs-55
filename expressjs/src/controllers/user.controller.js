import {userService} from '../services/user.service.js';

export const userController = {
    async createOrder(req, res, next){
        const order = await userService.createOrder(req);
        res.status(201).json(order);
    },
    async getOrdersByUserId(req, res, next){
        const orders = await userService.getOrdersByUserId(req);
        res.status(200).json(orders);
    }
}