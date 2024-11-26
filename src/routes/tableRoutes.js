import express from 'express';
import TableController from '../controllers/tableController.js';

const router = express.Router();

router.post('/v1/customers', TableController.signup);
router.post('/v1/menu/choose', TableController.signup);
router.put('/v1/menu/choose', TableController.login);
router.post('/v1/orders/checkout', TableController.logout);
router.get('/v1/menu-item', TableController.logout);

export default router;
