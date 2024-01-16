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

export const toggleTodoStatus = async (request: any, response: Response) => {
  try {
    const { isCompleted } = request.body;
    const { id } = request.params;

    const user = request.user;
    const existingTodo = await models.Todo.findById(id);

    if (!existingTodo) {
      return response
        .status(400)
        .json({ msg: 'There is no Todo with that Id' });
    }
    if (user !== existingTodo?.user.toString()) {
      return response
        .status(400)
        .json({ msg: 'This Todo was not created by you to update' });
    }
    const todo = await models.Todo.updateOne(
      {
        _id: id,
      },
      {
        isCompleted,
      }
    );
    return response
      .status(200)
      .json({ msg: 'Todo Updated Successfully ', todo: todo });
  } catch (error) {
    console.log('error occurred while toggle todo status', error);
    return response
      .status(500)
      .json({ msg: 'error occurred while toggle todo status' });
  }
};
