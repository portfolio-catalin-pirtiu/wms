import { Response, NextFunction } from 'express';
import { ReqUser } from '../../types/types';

export default function isAuthenticated(
  req: ReqUser,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    next();
  }
}
