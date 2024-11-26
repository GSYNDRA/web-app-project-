import express from 'express';
import authRoutes from './authRoutes.js';


const router = express.Router();

// Set up route modules
router.use('/auth', authRoutes);


export default router;
