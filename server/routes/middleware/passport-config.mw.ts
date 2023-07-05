import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import dbConfig from '../../services/dbConfig.js';
import { DatabaseUser } from '../../types/types.js';

console.log('passport config -> start');
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    (email, password, done) => {
      console.log('init function -> email', email);
      console.log('init function -> password', password);
      const sqlQuery = `SELECT * FROM users WHERE email = "${email}"`;
      const db = mysql.createConnection(dbConfig);

      db.query(sqlQuery, async (error, [user]: [DatabaseUser]) => {
        console.log('init function -> user', user);
        console.log('init function -> error', error);
        try {
          if (user && (await bcrypt.compare(password, user.password))) {
            console.log('init function -> passed password check');
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
console.log('passport config -> middle');

passport.serializeUser((user: DatabaseUser, done) => {
  console.log('serialize user', user);
  return done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
  console.log('deserialize user -> id ', id);
  const sqlQuery = `SELECT * FROM users WHERE id = "${id}"`;
  const db = mysql.createConnection(dbConfig);

  db.query(sqlQuery, (error, [user]: [DatabaseUser]) => {
    if (error) {
      return done(error);
    }
    return done(null, user);
  });
});
console.log('passport config -> end');
