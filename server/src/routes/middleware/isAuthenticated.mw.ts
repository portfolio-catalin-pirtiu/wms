import { Response, NextFunction } from 'express';
import { ReqUser } from '../../types/types';

export default function isUserAuthenticated(
  req: ReqUser,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    next();
  }
}
