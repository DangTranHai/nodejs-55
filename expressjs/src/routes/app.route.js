import express from 'express';
import routerLikes from './likes.route.js';
import routerRates from './rates.route.js';
import routerUser from './user.route.js';
const router = express.Router();

router.use('/likes', routerLikes);
router.use('/rates', routerRates);
router.use('/users', routerUser);

export default router;