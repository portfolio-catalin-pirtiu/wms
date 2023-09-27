import express, { Response } from 'express';
import { ReqUser } from '../../types/types';
import warehouseRouter from './warehouse/warehouse.js';

const router = express.Router();

router.get('/', (req: ReqUser, res: Response) => {});

router.use('/warehouse', warehouseRouter);

export default router;
