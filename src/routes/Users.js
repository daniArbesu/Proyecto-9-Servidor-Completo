/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import { upload } from '../middlewares/files.js';
import { loginUser, registerUser, uploadAvatar } from '../controllers/users.js';

// Aquí vamos a definir todas las rutas del server
// que estén detrás de /auth para autenticación de usuarios
const router = express.Router();

// POST http://localhost:4001/auth/register
router.post('/register', registerUser);
// POST http://localhost:4001/auth/login
router.post('/login', loginUser);
// POST http://localhost:4001/auth/avatar
router.post('/avatar', authMiddleware, upload.single('avatar'), uploadAvatar);

export default router;
