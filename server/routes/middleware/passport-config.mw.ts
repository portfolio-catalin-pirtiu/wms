import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import dbConfig from '../../services/dbConfig.js';
import { DatabaseUser } from '../../types/types.js';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    (email, password, done) => {
      const sqlQuery = `SELECT * FROM users WHERE email = "${email}"`;
      const db = mysql.createConnection(dbConfig);

      db.query(sqlQuery, async (error, [user]: [DatabaseUser]) => {
        try {
          if (user && (await bcrypt.compare(password, user.password))) {
            return done(null, user);
          }
          return done(null, false);
        } catch {
          return done(error);
        }
      });
    }
  )
);

passport.serializeUser((user: DatabaseUser, done) => done(null, user.id));

passport.deserializeUser((id: number, done) => {
  const sqlQuery = `SELECT * FROM users WHERE id = "${id}"`;
  const db = mysql.createConnection(dbConfig);

  db.query(sqlQuery, (error, [user]: [DatabaseUser]) => {
    if (error) {
      return done(error);
    }
    return done(null, user);
  });
});