import express from 'express';
import { ReqUser } from '../types/types';

const router = express.Router();

router.get('/', (req: ReqUser, res: express.Response) => {
  console.log('dashboard GET', req.isAuthenticated());
  console.log('dashboard GET', req.headers.cookie);
  res.status(200).json({ 
    isLoggedIn: req.isAuthenticated(),
    username: req.user?.name,
    email: req.user?.email
  });
});

export default router;
