import { prisma } from '../common/prisma/prisma.connect.js';

export const userService = {
    async createOrder(req) {
        const { userId, foodId, amount, code, arrSubId } = req.body;
        const user = await prisma.user.findUnique({ where: { user_id: userId } });
        const food = await prisma.food.findUnique({ where: { food_id: foodId } });

        if (!user) {
            throw new Error("User not found");
        }
        if (!food) {
            throw new Error("Food not found");
        }

        const order = await prisma.order.create({
            data: {
                user_id: Number(userId),
                food_id: Number(foodId),
                amount: Number(amount),
                code: code,
                arr_sub_id: arrSubId
            }
        });
        return order;
    },

    async getOrdersByUserId(req) {
        const { userId } = req.params;

        const exitsUser = await prisma.user.findUnique({
            where: {
                user_id: Number(userId)
            }
        });

        if (!exitsUser) {
            throw new Error("User not found");
        }

        const orders = await prisma.order.findMany({
            where: {
                user_id: exitsUser.user_id,
            },
            include: {
                food: {
                    select: { food_id: true, food_name: true, price: true }
                }
            }
        });
        return orders;
    }
};