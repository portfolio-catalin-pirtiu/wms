import express, { Response } from 'express';
import { ReqUser } from '../../types/types';
import warehouseRouter from './warehouse/warehouse.js';
import isAuthenticated from '../middleware/isAuthenticated.mw.js';

const router = express.Router();
router.use(isAuthenticated);

router.get('/', (req: ReqUser, res: Response) => {});

router.use('/warehouse', warehouseRouter);

export default router;
