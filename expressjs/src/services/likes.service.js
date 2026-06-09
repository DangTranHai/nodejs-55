import { prisma } from '../common/prisma/prisma.connect.js';

export const likeService = {
    async likeRes(req) {
        const { userId, restaurantId } = req.body;
        const user = await prisma.user.findUnique({ where: { user_id: userId } });
        const res = await prisma.restaurant.findUnique({ where: { res_id: restaurantId } });
        if (!user || !res) throw new Error("User or Restaurant not found");
        const exitsLike = await prisma.like_res.findFirst({
            where: { user_id: userId, res_id: restaurantId }
        });
        if (exitsLike) throw new Error("You have already liked this restaurant");

        return await prisma.like_res.create({
            data: {
                user_id: userId,
                res_id: restaurantId,
                date_like: new Date()
            }
        });
    },

    async unlikeRes(req) {
        const { userId, restaurantId } = req.body;
        const exitsLike = await prisma.like_res.findFirst({
            where: { user_id: userId, res_id: restaurantId }
        });
        if (!exitsLike) throw new Error("You have not liked this restaurant");
        return await prisma.like_res.deleteMany({
            where: { user_id: userId, res_id: restaurantId }
        });
    },

    async getLikesByRestaurantId(req) {
        const { restaurantId } = req.params;
        
        const exitsRestaurant = await prisma.restaurant.findUnique({
            where: { res_id: parseInt(restaurantId) }
        });
        if (!exitsRestaurant) throw new Error("Restaurant not found");

        return await prisma.like_res.findMany({
            where: { res_id: exitsRestaurant.res_id },
            include: {
                user: {
                    select: { user_id: true, full_name: true, email: true }
                }
            }
        });
    },

    async getLikesByUserId(req) {
        const { userId } = req.params;
        
        const exitsUser = await prisma.user.findUnique({
            where: { user_id: parseInt(userId) }
        });
        if (!exitsUser) throw new Error("User not found");

        return await prisma.like_res.findMany({
            where: { user_id: exitsUser.user_id },
            include: {
                restaurant: {
                    select: { res_id: true, res_name: true, Image: true }
                }
            }
        });
    }
};