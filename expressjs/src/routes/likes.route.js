import express from 'express';
import {likeController} from '../controllers/likes.controller.js';
const routerLikes = express.Router();

routerLikes.post('/like', likeController.addLike);
routerLikes.delete('/unlike', likeController.unLike);
routerLikes.get('/restaurant/:restaurantId', likeController.getLikesByRestaurantId);
routerLikes.get('/user/:userId', likeController.getLikesByUserId);

export default routerLikes;