import { Router } from 'express';
import multer from 'multer';
import {  login, signup } from '../controllers/userController';

const router = Router();
const upload = multer(); // Middleware to parse multipart form-data

router.post('/v1/signup', upload.none(), signup);
router.post('/v1/login', upload.none(), login);

export default router;
