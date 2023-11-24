import express from 'express';
import { ReqUser } from '../types/types';

const router = express.Router();

router.get('/', (req: ReqUser, res: express.Response) => {
  res.status(200).json({
    isLoggedIn: req.isAuthenticated(),
    username: req.user?.name,
    email: req.user?.email,
  });
});

router.get('/test', (req, res) => {
  console.log('dashboard test');
  res.status(200).json('test successful');
});
export default router;
