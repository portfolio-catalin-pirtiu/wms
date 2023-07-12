import passport from 'passport';
import express, { Request, Response } from 'express';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import dbConfig from '../services/dbConfig.js';
import { SignUpWithEmailUser, ReqUser } from '../types/types.js';

const router = express.Router();

console.log('authentication.tx -> before passport.use(local strategy)');

router.post('/users', async (req: Request, res: Response) => {
  // post a new user
  const db = mysql.createConnection(dbConfig);
  db.connect((error) => {
    if (error) {
      console.log('Error connecting to DB', error.message);
    }
    console.log('Connected to MySQL DB');
  });

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

  const sqlQuery = `INSERT INTO users (name, email, password, address_1, address_2, city, county, country, postcode) 
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
      console.log('Database Error', error.message);
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
    console.log('post login');
    if (req.isAuthenticated()) {
      console.log('post login -> true');
      res.status(200).json({
        isLoggedIn: true,
        name: req.user?.name,
        email: req.user?.email,
      });
    } else {
      console.log('post login -> false');
      res.status(401);
    }
  }
);


router.get('/status', (req: ReqUser, res: Response) => {
  console.log('auth status');
  if (req.isAuthenticated()) {
    // console.log('auth status -> if statement ->  true');
    res.status(200).json({
      isLoggedIn: true,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    // console.log('auth status -> if statement ->  false');
    res.status(401).json({
      isLoggedIn: false,
      name: '',
      email: '',
    });
  }
});

router.post('/logout', (req: ReqUser, res: Response) => {
  console.log('logout route');
  req.logout((error: Error) => {
    if (error) {
      console.log('logout -> error', error);
      res.sendStatus(417);
    } else {
      console.log('logout -> no error')
      res.status(200).json({
        isLoggedIn: false,
        name: '',
        email: ''
      });
    }
  })
  // res.sendStatus(401);
})

// router.post('/test', (req: Request, res: Response) => {
  //   console.log('auth route - test');
  //   interface LoginAuthentication {
//     email: string;
//     password: string;
//   }

//   const { email }: LoginAuthentication = req.body as LoginAuthentication;

//   console.log('auth route - test -> email', email);

//   const sqlQuery = `SELECT * FROM users WHERE email = "${email}"`;

//   const db = mysql.createConnection(dbConfig);
//   db.query(sqlQuery, (error, [result]) => {
//     if (error) {
//       console.log('DB error', error.message);
//       res.sendStatus(400);
//     }
//     console.log('DB REsult', result);
//   });
//   db.end();
// });

// router.get('/test', (req: ReqUser, res: Response) => {
//   console.log('GET test route -> req.user', req.user?.id);
//   console.log('GET test route -> req.user', req.user?.email);
//   console.log('GET test route -> isAuthenticated()', req.isAuthenticated());
//   res.sendStatus(201);
// });
export default router;
