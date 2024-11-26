import express from 'express';
import AdminController from '../controllers/adminController.js';

const router = express.Router();

router.put('/v1/menu/choose', AdminController.signup);
router.get('/v1/tables/vacant', AdminController.login);
router.put('/v1/tables/status', AdminController.logout);
router.get('/v1/revenue', AdminController.logout);

// router.post('/v1/refresh-token', AuthController.refreshToken);
// change password

export default router;
