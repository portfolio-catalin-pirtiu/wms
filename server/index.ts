import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import authenticationRouter from './src/routes/authentication.js';
import dashboardRouter from './src/routes/dashboard.js';
import userRouter from './src/routes/user.js';
import inventoryRouter from './src/routes/inventory/inventory.js';
import './src/routes/middleware/passport-config.mw.js';
// the above middleware is a side effect call;
// it means that it will be called immediately
// this is necessary for the passport.use(LocalStrategy)
// middleware to be invoked before app.use(passport.initialize())

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// the cors middleware needs to be configure this way so that cookies
// can be set and sent
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// app use session needs to be called before app.use(password.initialize())
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_STORE_WMS_URL as string,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 4 * 3600 * 1000, // 4 hours
      // maxAge: 10000
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/authentication', authenticationRouter);
app.use('/dashboard', dashboardRouter);
app.use('/user', userRouter);
app.use('/inventory', inventoryRouter);

app.listen(process.env.PORT || 4000);
