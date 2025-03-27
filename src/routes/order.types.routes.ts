import express from 'express';
import { getOrderTypes } from '../controllers/order.type.controller';

const router = express.Router();

router.post('/getOrderTypes', getOrderTypes);

export default router;
