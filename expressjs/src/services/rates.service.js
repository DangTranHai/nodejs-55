import {prisma} from '../common/prisma/prisma.connect.js';

export const rateService = {
    async addRate(req) {
        const { userId, restaurantId, amount } = req.body;
        const user = await prisma.users.findUnique({ where: { user_id: userId } });
        const res = await prisma.restaurant.findUnique({ where: { res_id: restaurantId } });
        
        if (!user || !res) {
            throw new Error("User or Restaurant not found");
        }

        return await prisma.rate_res.create({
            data: {
                user_id: userId,
                res_id: restaurantId,
                amount: amount,
                date_rate: new Date()
            }
        });
    },

    async getRatesByRestaurantId(req) {
        const { restaurantId } = req.params;
        
        const rates = await prisma.rate_res.findMany({
            where: { res_id: parseInt(restaurantId) },
            include: {
                users: { select: { user_id: true, full_name: true } }
            }
        });
        return rates;
    },

    async getRatesByUserId(req) {
        const { userId } = req.params;
        
        const rates = await prisma.rate_res.findMany({
            where: { user_id: parseInt(userId) },
            include: {
                restaurant: { select: { res_id: true, res_name: true } }
            }
        });
        return rates;
    }
};