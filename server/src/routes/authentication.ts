import passport from 'passport';
import express, { Request, Response } from 'express';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import dbConfig from '../data/dbConfig.js';
import { SignUpWithEmailUser, ReqUser } from '../types/types.js';

const router = express.Router();

router.post('/users', async (req: Request, res: Response) => {
  // post a new user
  const db = mysql.createPool(dbConfig);

  const {
    name,
    email,
    password,
    address1,
    address2,
    city,
    country,
    county,
    postcode,
  }: SignUpWithEmailUser = req.body as SignUpWithEmailUser;
  const hashedPassword = await bcrypt.hash(password, 10);

  let sqlQuery = `INSERT INTO users 
    (name, email, password, address1, address2, city, county, country, postcode) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    name,
    email,
    hashedPassword,
    address1,
    address2,
    city,
    county,
    country,
    postcode,
  ];
  sqlQuery = mysql.format(sqlQuery, values);

  async function createNewUser(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      db.query(sqlQuery, (error) => {
        if (error) return reject(error);
        return resolve(true);
      });
    });
  }

  try {
    const isUserCreated = await createNewUser();
    if (isUserCreated) res.sendStatus(200);
    db.end();
  } catch (e) {
    if (e instanceof Error) res.status(400).json(e.message);
  }
});

router.post(
  '/login',
  passport.authenticate('local'),
  (req: ReqUser, res: Response) => {
    if (req.isAuthenticated()) {
      res.status(200).json({
        isLoggedIn: true,
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      });
    } else {
      res.status(401);
    }
  }
);

router.get('/status', (req: ReqUser, res: Response) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      isLoggedIn: true,
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    res.status(401).json({
      isLoggedIn: false,
    });
  }
});

router.post('/logout', (req: ReqUser, res: Response) => {
  req.logout((error: Error) => {
    if (error) {
      res.sendStatus(417);
    } else {
      res.status(200).json({
        isLoggedIn: false,
      });
    }
  });
});

export default router;
