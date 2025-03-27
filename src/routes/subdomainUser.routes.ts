import express from 'express';
import { getSubdomainUsers } from '../controllers/subdomain-user.controller';

const router = express.Router();

router.post('/getUsers', getSubdomainUsers);

export default router;
