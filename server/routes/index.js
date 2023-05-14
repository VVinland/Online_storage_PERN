import {Router} from 'express';
const router = new Router();
import typeRouter from './type.js';
import brandRouter from './brand.js';
import deviceRouter from './device.js';
import userRouter from './user.js';

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);


export default router;