import { NextFunction, Response } from 'express';
import { models } from '../models';

export const createTodo = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request.user;
    const { name, isCompleted } = request.body;

    const exisitingTodo = await models.Todo.findOne({ name });
    if (exisitingTodo) {
      return response.status(409).json({ msg: 'Todo name already exists' });
    }
    const todo = await models.Todo.create({
      name,
      isCompleted,
      user: userId,
    });
    return response
      .status(201)
      .json({ msg: 'Todo created successfully', todo: todo });
  } catch (error) {
    console.log('an error occured in Create Todo', error);
    next(error);
  }
};
