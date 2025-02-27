// src/routes/destinationRoutes.ts
import { Router } from 'express';
import { fetchDestinations } from '../controllers/destinationController';

const router = Router();

// POST method for /api/profile/fetchdestinations
router.post('/fetchdestinations', fetchDestinations);

export default router;
