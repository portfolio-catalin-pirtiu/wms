import express, { Response } from 'express';
import mysql from 'mysql';
import dbConfig from '../../../data/dbConfig.js';
import { ReqUser, Warehouse } from '../../../types/types.js';
import isUserAuthenticated from '../../middleware/isAuthenticated.mw.js';

const router = express.Router();

router.use(isUserAuthenticated);

router.post('/new', async (req: ReqUser, res: Response) => {
  const {
    owner,
    name,
    address1,
    address2,
    city,
    county,
    country,
    postcode,
  }: Warehouse = req.body as Warehouse;

  const newWarehouseSqlQuery = `INSERT INTO warehouses (owner, name, address1, address2, city, county, country, postcode) 
    VALUES (
      "${owner}",
      "${name}",
      "${address1 || ''}",
      "${address2 || ''}",
      "${city || ''}",
      "${county || ''}",
      "${country || ''}",
      "${postcode || ''}"
    )`;

  const db = mysql.createPool(dbConfig);

  async function createNewWarehouse(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      db.query(newWarehouseSqlQuery, (error) => {
        if (error) {
          return reject(error);
        }
        return resolve(true);
      });
    });
  }

  try {
    const isNewWarehouseCreated = await createNewWarehouse();
    if (isNewWarehouseCreated) {
      res.sendStatus(200);
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(401).json(e.message);
    }
  }
  db.end();
});

router.get('/', async (req: ReqUser, res: Response) => {
  const userId = req.user?.id;
  let allWarehousesSqlQuery: string;
  if (typeof userId === 'number') {
    allWarehousesSqlQuery = `SELECT * FROM warehouses WHERE owner = "${userId}"`;
  }
  const db = mysql.createConnection(dbConfig);

  async function getAllWarehouses(): Promise<Array<Warehouse>> {
    return new Promise((resolve, reject) => {
      db.query(allWarehousesSqlQuery, (error, warehouses: Array<Warehouse>) => {
        if (error) return reject(error);
        if (warehouses.length === 0)
          return reject(new Error('Please add New Warehouse'));
        return resolve(warehouses);
      });
    });
  }

  try {
    const allWarehouses = await getAllWarehouses();
    res.status(200).json(allWarehouses);
  } catch (e) {
    if (e instanceof Error) res.status(401).json(e.message);
  }
});

router.put('/edit/:id', (req: ReqUser, res: Response) => {});

export default router;
