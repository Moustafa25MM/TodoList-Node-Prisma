import { models } from '../models';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { authMethods } from '../middlewares/auth';

export const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;
    const existingUser = await models.User.findOne({ email });

    if (existingUser) {
      return response.status(409).send('user already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await models.User.create({
      name,
      email,
      password: hashedPassword,
    });
    return response.status(201).send('user created successfully');
  } catch (error) {
    console.log('error occured in create user', error);
    throw error;
  }
};

export const loginUser = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const existingUser = await models.User.findOne({ email });
    if (!existingUser) {
      return response.status(401).json({ error: 'user does not exist' });
    }

    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!comparePassword) {
      response.status(401).json({ error: 'Invalid email or password' });
    }
    const token = authMethods.generateJWT({ id: existingUser.id });

    const userData = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };
    response.status(200).json({ token, user: userData });
  } catch (error) {
    console.log('error occurred in LoginUser', error);
    throw error;
  }
};
