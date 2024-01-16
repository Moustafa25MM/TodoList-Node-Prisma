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

export const getTodoById = async (request: any, response: Response) => {
  try {
    const { id } = request.params;
    const userId = request.user;

    const todo = await models.Todo.findOne({ _id: id, user: userId });
    if (!todo) {
      return response.status(404).json({
        msg: 'Todo not found or you do not have permission to view it',
      });
    }

    return response.status(200).json(todo);
  } catch (error) {
    console.log('Error occurred while getting a Todo by ID', error);
    return response
      .status(500)
      .json({ msg: 'Error occurred while getting a Todo by ID' });
  }
};

export const getAllTodos = async (request: any, response: Response) => {
  try {
    const userId = request.user;
    const todos = await models.Todo.find({ user: userId });

    return response.status(200).json(todos);
  } catch (error) {
    console.log('Error occurred while getting all Todos', error);
    return response
      .status(500)
      .json({ msg: 'Error occurred while getting all Todos' });
  }
};

export const getAllCompletedTodos = async (
  request: any,
  response: Response
) => {
  try {
    const userId = request.user;
    const todos = await models.Todo.find({ user: userId, isCompleted: true });

    return response.status(200).json(todos);
  } catch (error) {
    console.log('Error occurred while getting completed Todos', error);
    return response
      .status(500)
      .json({ msg: 'Error occurred while getting completed Todos' });
  }
};

export const updateTodo = async (request: any, response: Response) => {
  try {
    const { id } = request.params;
    const { name, isCompleted } = request.body;
    const userId = request.user;

    if (!name && !isCompleted) {
      return response.status(400).json({
        msg: 'no data to update with',
      });
    }
    const existingTodo = await models.Todo.findOne({
      name: name,
      user: userId,
      _id: { $ne: id },
    });

    if (existingTodo) {
      return response.status(400).json({
        msg: 'There is a Todo with that name',
      });
    }
    const todo = await models.Todo.findOneAndUpdate(
      { _id: id, user: userId },
      { name, isCompleted },
      { new: true }
    );

    if (!todo) {
      return response.status(404).json({
        msg: 'Todo not found or you do not have permission to update it',
      });
    }

    return response
      .status(200)
      .json({ msg: 'Todo updated successfully', todo });
  } catch (error) {
    console.log('Error occurred while updating Todo', error);
    return response
      .status(500)
      .json({ msg: 'Error occurred while updating Todo' });
  }
};

export const deleteTodo = async (request: any, response: Response) => {
  try {
    const { id } = request.params;
    const userId = request.user;

    const result = await models.Todo.deleteOne({ _id: id, user: userId });

    if (result.deletedCount === 0) {
      return response.status(404).json({
        msg: 'Todo not found or you do not have permission to delete it',
      });
    }

    return response.status(200).json({ msg: 'Todo deleted successfully' });
  } catch (error) {
    console.log('Error occurred while deleting Todo', error);
    return response
      .status(500)
      .json({ msg: 'Error occurred while deleting Todo' });
  }
};
