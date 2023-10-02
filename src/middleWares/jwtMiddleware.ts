import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import environment from '../config/environment';


interface MyJwtPayload extends JwtPayload {
  id: number;
}

const  jwtSecret  = '1234';

console.log(jwtSecret)

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Authentication failed');
  }

  const token: string = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, jwtSecret) as MyJwtPayload;

    req.userId = payload.id;

    next();
  } catch (error) {
    throw new Error('Authentication failed');
  }
};
