import { models } from '../models';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

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
