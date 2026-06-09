import {likeService} from '../services/likes.service.js';

export const likeController = {
    async addLike(req, res, next) {
        const likeRes = await likeService.likeRes(req);
        res.status(201).json({
            message: "Like added successfully",
            like: likeRes
        });
    },
    async unLike(req, res, next) {
        const likeRes = await likeService.unlikeRes(req);
        res.status(200).json({
            message: "Like removed successfully",
            like: likeRes
        });
    },
    async getLikesByRestaurantId(req, res, next) {
        const likes = await likeService.getLikesByRestaurantId(req);
        res.status(200).json({
            message: "Likes retrieved successfully",
            likes: likes
        });
    },
    async getLikesByUserId(req, res, next) {
        const likes = await likeService.getLikesByUserId(req);
        res.status(200).json({
            message: "Likes retrieved successfully",
            likes: likes
        });
    }
};