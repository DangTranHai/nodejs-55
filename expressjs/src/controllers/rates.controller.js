import {rateService} from '../services/rates.service.js';
export const ratesController = {
    async addRate(req, res){
        const rateRes = await rateService.addRate(req);
        res.status(201).json({
            message: "Rate added successfully",
            rate: rateRes
        });
    },
    async getRatingByRestaurantId(req, res){
        const rates = await rateService.getRatingByRestaurantId(req);
        res.status(200).json({
            message: "Rates retrieved successfully",
            rates: rates
        });
    },
    async getRatingByUserId(req, res){
        const rates = await rateService.getRatingByUserId(req);
        res.status(200).json({
            message: "Rates retrieved successfully",
            rates: rates
        });
    }
};