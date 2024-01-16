import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { models } from '../models';

dotenv.config();
const JWTSecret = process.env.JWT_SECRET;

type TokenPayload = {
  id: string;
};

const generateJWT = (payload: TokenPayload): String =>
  jwt.sign(payload, JWTSecret as string, { expiresIn: '7d' });

const isAuthenicated = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.headers.authorization;

    if (!token) {
      return response
        .status(401)
        .json({ error: 'Unauthorized: Token not provided' });
    }
    const payload: { id: string } = jwt.verify(token, JWTSecret as string) as {
      id: string;
    };
    const existingUser = await models.User.findById(payload.id);
    if (!existingUser) {
      return response.status(400);
    }
    request.user = existingUser.id;
    next();
  } catch (error) {
    return response.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export const authMethods = {
  generateJWT,
  isAuthenicated,
};
