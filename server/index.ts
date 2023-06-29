import express, { Express } from 'express';
import cors from 'cors';
import 'dotenv/config';
import authenticationRouter from './routes/authentication.js';

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/authentication', authenticationRouter);

app.listen(process.env.PORT || 4000, () => console.log('Server Running'));
