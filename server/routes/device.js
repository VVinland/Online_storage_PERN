import { Router } from 'express';
const router = new Router();
import DeviceController from '../controllers/deviceController.js';
import checkRole from '../middleware/checkRoleMiddleware.js';

router.post('/', checkRole('ADMIN'), DeviceController.create);
router.get('/', DeviceController.getAll);
router.get('/:id', DeviceController.getOne);

export default router;