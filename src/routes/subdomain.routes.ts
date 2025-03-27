import express from 'express';
import { getSubdomains } from '../controllers/subdomain.controller';

const router = express.Router();

router.post('/getsubdomain', getSubdomains);

export default router;
