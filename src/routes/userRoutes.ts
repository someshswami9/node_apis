import { Router } from 'express';
import multer from 'multer';
import { signup, login } from '../controllers/userController';

const router = Router();
const upload = multer(); // Middleware to parse multipart form-data

router.post('/signup', upload.none(), signup);
router.post('/login', upload.none(), login);

export default router;
