import passport from 'passport';
import express, { Request, Response } from 'express';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import dbConfig from '../services/dbConfig.js';
import { SignUpWithEmailUser, ReqUser } from '../types/types.js';

const router = express.Router();

router.post('/users', async (req: Request, res: Response) => {
  // post a new user
  const db = mysql.createConnection(dbConfig);

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

  const sqlQuery = `INSERT INTO users (name, email, password, address1, address2, city, county, country, postcode) 
    VALUES (
      "${name}", 
      "${email}", 
      "${hashedPassword}", 
      "${address1 || 'null'}", 
      "${address2 || 'null'}", 
      "${city || 'null'}", 
      "${county || 'null'}", 
      "${country || 'null'}", 
      "${postcode || 'null'}"
    )`;

  db.query(sqlQuery, (error) => {
    if (error) {
      res.statusMessage = 'Database Error';
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  });
  db.end();
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
