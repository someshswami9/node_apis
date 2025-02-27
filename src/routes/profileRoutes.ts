// src/routes/profileRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import { createProfile, updateProfile } from '../controllers/profileController';

const router = Router();
const upload = multer().none(); // For multipart form data with no file uploads

// POST endpoint to create a profile
router.post('/createProfile', upload, createProfile);
router.post('/updateProfile', upload, updateProfile);

export default router;
