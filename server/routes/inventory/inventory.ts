import express, { Response } from 'express';
import mysql, { MysqlError } from 'mysql';
import { ReqUser } from '../../types/types';
import warehouseRouter from './warehouse/warehouse.js';
import isUserAuthenticated from '../middleware/isAuthenticated.mw';

const router = express.Router();

// router.use(isUserAuthenticated);

router.get('/', (req: ReqUser, res: Response) => {
  console.log('inventory router is Auth', req.isAuthenticated());
})

router.use('/warehouse', warehouseRouter);

export default router;
