import express, { Request, Response } from 'express';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import dbConfig from '../services/dbConfig.js';

const router = express.Router();

interface User {
  organizationName: string;
  email: string;
  password: string;
  address1: string;
  address2: string;
  city: string;
  county: string;
  country: string;
  postcode: string;
}
router.post('/users', async (req: Request, res: Response) => {
  // console.log('Authentication router -> body', req.body);
  const db = mysql.createConnection(dbConfig);
  db.connect((error) => {
    if (error) {
      console.log('Error connecting to DB', error.message);
    }
    console.log('Connected to MySQL DB');
  });

  const {
    organizationName,
    email,
    password,
    address1,
    address2,
    city,
    country,
    county,
    postcode,
  }: User = req.body as User;
  console.log('DB Input -> email', email);
  const hashedPassword = await bcrypt.hash(password, 10);

  const sqlQuery = `INSERT INTO users (name, email, pass, address_1, address_2, city, county, country, postcode) 
    VALUES 
    ("${organizationName}", 
    "${email}", 
    "${hashedPassword}", 
    "${address1}", 
    "${address2}", "${city}", "${county}", "${country}", "${postcode}")`;
  console.log('auth route -> SQL query', sqlQuery);

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.log('Database Error', error.message);
      // res.json({
      //   error: error.message,
      // });
    }
    // res.json({
    //   success: 'New User added successfully',
    // });

    console.log('DB Results -> ', results);
  });
  db.end();
});
export default router;
