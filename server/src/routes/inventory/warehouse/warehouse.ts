import express, { Response } from 'express';
import mysql from 'mysql';
import dbConfig from '../../../data/dbConfig.js';
import { ReqUser, Warehouse } from '../../../types/types.js';

const router = express.Router();
// this route (warehouse route) secured one level up at '/inventory' route

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

  let newWarehouseSqlQuery = `INSERT INTO warehouses 
    (owner, name, address1, address2, city, county, country, postcode) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    owner,
    name,
    address1,
    address2,
    city,
    county,
    country,
    postcode,
  ];
  newWarehouseSqlQuery = mysql.format(newWarehouseSqlQuery, values);

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
    if (isNewWarehouseCreated) res.sendStatus(200);
    db.end();
  } catch (e) {
    if (e instanceof Error) res.status(401).json(e.message);
  }
});

router.get('/', async (req: ReqUser, res: Response) => {
  const userId = req.user?.id;
  let allWarehousesSqlQuery = 'SELECT * FROM warehouses WHERE owner = ?';
  if (typeof userId === 'number') {
    allWarehousesSqlQuery = mysql.format(allWarehousesSqlQuery, [userId]);
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
    db.end();
  } catch (e) {
    if (e instanceof Error) res.status(401).json(e.message);
  }
});

router.put('/edit/:id', async (req: ReqUser, res: Response) => {
  const {
    id,
    name,
    address1,
    address2,
    city,
    county,
    country,
    postcode,
  }: Warehouse = req.body as Warehouse;

  let sqlUpdateWarehouse = `UPDATE warehouses SET 
    name = ?, address1 = ?, address2 = ?, city = ?, county = ?, country = ?, postcode = ? 
    WHERE id = ?`;
  const values = [
    name,
    address1,
    address2,
    city,
    county,
    country,
    postcode,
    id,
  ];
  sqlUpdateWarehouse = mysql.format(sqlUpdateWarehouse, values);
  const db = mysql.createPool(dbConfig);

  async function updateWarehouse(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      db.query(sqlUpdateWarehouse, (error) => {
        if (error) return reject(error);
        return resolve(true);
      });
    });
  }

  try {
    const isWarehouseUpdated = await updateWarehouse();
    if (isWarehouseUpdated) res.sendStatus(200);
    db.end();
  } catch (e) {
    if (e instanceof Error) res.status(401).json(e.message);
  }
});

export default router;
