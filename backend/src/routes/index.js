import { Router } from 'express';
import AIRouter from './AI.js';
import UserRouter from './User.js';
const router = Router();
router.use('/', AIRouter);
router.use('/', UserRouter);
export default router;