import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthenticatedRequest from '../types/AuthenticatedRequest';

export default function authChecker(req: Request, res: Response, next: NextFunction) {
  const secret = process.env.SECRET;
  if (!secret) {
    return res.status(500).json({});
  }

  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized');
  }

  console.log('antes', req.headers.authorization);
  const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
  console.log('token', token);
  let userId: string = '';
  try {
    const result = jwt.verify(token, secret);
    userId = result.sub as string;
  } catch {
    return res.status(401).send('Unauthorized');
  }

  (req as AuthenticatedRequest).userId = userId;

  next();
}
