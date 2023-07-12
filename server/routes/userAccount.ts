import express, {Request, Response} from 'express';
import { ReqUser } from '../types/types';

const router = express.Router();

router.get("/account", (req: Request, res: Response) => {
  console.log('user account route');
  res.json({
    ...req.user,
    password: ''
  });
});

export default router;