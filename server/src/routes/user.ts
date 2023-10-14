import express, { Response } from 'express';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import dbConfig from '../data/dbConfig.js';
import { ReqUser, DatabaseUser } from '../types/types.js';

const router = express.Router();

interface CurrentPassword {
  password: string;
}

interface ComparePasswords extends CurrentPassword {
  oldPassword: string;
}

interface PasswordChange extends ComparePasswords {
  newPassword: string;
}

router.get('/account', (req: ReqUser, res: Response) => {
  res.json({
    ...req.user,
    password: '',
  });
});

router.post('/delete', (req: ReqUser, res: Response) => {
  const userId = req.user?.id;
  req.logout((error: Error) => {
    if (error) {
      res.status(417).json({ message: 'Logout Unsuccessful' });
    }
  });

  const db = mysql.createConnection(dbConfig);
  if (typeof userId === 'number') {
    let sqlQuery = 'DELETE FROM users WHERE id = ?';
    sqlQuery = mysql.format(sqlQuery, [userId]);
    db.query(sqlQuery, (error) => {
      if (error) {
        res.status(404).json({ message: 'Delete Account Unsuccessful' });
      } else {
        res.status(200).json({ isLoggedIn: false, name: '', email: '' });
      }
    });
  } else {
    res.status(404).json({ message: 'Invalid User ID' });
  }
  db.end();
});

router.post('/passwordChange', async (req: ReqUser, res: Response) => {
  const userId = req.user?.id;
  const db = mysql.createPool(dbConfig);

  async function selectPassword(): Promise<string> {
    let selectPasswordQuery = 'SELECT password FROM users WHERE id = ?';
    if (typeof userId === 'number') {
      selectPasswordQuery = mysql.format(selectPasswordQuery, [userId]);
    }

    return new Promise((resolve, reject) => {
      db.query(
        selectPasswordQuery,
        (error, [{ password }]: [CurrentPassword]) => {
          if (error) {
            return reject(error);
          }
          return resolve(password);
        }
      );
    });
  }

  async function comparePasswords({ oldPassword, password }: ComparePasswords) {
    return bcrypt.compare(oldPassword, password);
  }

  async function updatePassword(newHashedPassword: string): Promise<boolean> {
    let changePasswordQuery = 'UPDATE users SET password = ? WHERE id = ?';
    const values = [newHashedPassword, userId];
    if (typeof userId === 'number') {
      changePasswordQuery = mysql.format(changePasswordQuery, values);
    }

    return new Promise((resolve, reject) => {
      db.query(changePasswordQuery, (error) => {
        if (error) {
          return reject(error);
        }
        return resolve(true);
      });
    });
  }

  try {
    const { oldPassword, newPassword } = req.body as PasswordChange;
    const password = await selectPassword();
    const match = await comparePasswords({
      oldPassword,
      password,
    });

    if (match) {
      const newHashedPassword = await bcrypt.hash(newPassword, 10);
      const isPasswordUpdated = await updatePassword(newHashedPassword);

      if (isPasswordUpdated) {
        res.sendStatus(201);
        db.end();
      }
    } else {
      throw new Error('Passwords do not match');
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(401).json({ message: e.message });
    }
  }
});

router.post('/updateAccount', async (req: ReqUser, res: Response) => {
  const userId = req.user?.id;
  const { address1, address2, city, county, country, postcode } =
    req.body as DatabaseUser;
  const db = mysql.createPool(dbConfig);

  async function updateAccount(): Promise<boolean> {
    let sqlQuery = `UPDATE users SET 
      address1 = ?, address2 = ?, city = ?, county = ?, country = ?, postcode = ? 
      WHERE id = ?`;
    const values = [
      address1,
      address2,
      city,
      county,
      country,
      postcode,
      userId,
    ];
    sqlQuery = mysql.format(sqlQuery, values);

    return new Promise((resolve, reject) => {
      db.query(sqlQuery, (error) => {
        if (error) {
          return reject(error);
        }
        return resolve(true);
      });
    });
  }

  try {
    const accountIsUpdated = await updateAccount();
    if (accountIsUpdated) {
      res.sendStatus(200);
      db.end();
    } else {
      res.status(404).json({ message: 'Unable to update account' });
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ message: e.message });
    }
  }
});

export default router;
