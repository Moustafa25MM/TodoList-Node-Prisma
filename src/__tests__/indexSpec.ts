import request from 'supertest';
import { app } from './../index';
import prisma from '../client';
import bcrypt from 'bcrypt';

const authenticateAndGetToken = async () => {
  const credentials = {
    email: 'testUser@example.com',
    password: 'password',
  };

  const response = await request(app).post('/user/login').send(credentials);
  return response.body.token;
};

describe('User Routes', () => {
  beforeAll(async () => {
    await prisma.todo.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'testUser@example.com',
        password: await bcrypt.hash('password', 12),
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new user successfully', async () => {
    const newUser = {
      name: 'New Test User',
      email: 'newTestUser@example.com',
      password: 'password',
    };

    const response = await request(app)
      .post('/user/create')
      .send(newUser)
      .expect(201);

    expect(response.text).toBe('user created successfully');
  });

  it('should log in user successfully', async () => {
    const credentials = {
      email: 'testUser@example.com',
      password: 'password',
    };

    const response = await request(app)
      .post('/user/login')
      .send(credentials)
      .expect(200);

    expect(response.body.token).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe(credentials.email);
  });

  it('should fail to log in with incorrect credentials', async () => {
    const credentials = {
      email: 'testUser@example.com',
      password: 'wrongpassword',
    };

    const response = await request(app)
      .post('/user/login')
      .send(credentials)
      .expect(404);

    expect(response.body.error).toBe('Invalid email or password');
  });
});

describe('Todo Routes', () => {
  let token: string;
  let userId: string;
  let todoId: string;

  beforeAll(async () => {
    await prisma.todo.deleteMany({});
    await prisma.user.deleteMany({});

    const hashedPassword = await bcrypt.hash('password', 12);
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'testUser@example.com',
        password: hashedPassword,
      },
    });
    userId = user.id;
    token = await authenticateAndGetToken();

    const todo = await prisma.todo.create({
      data: {
        name: 'Test Todo',
        isCompleted: false,
        userId: userId,
      },
    });
    todoId = todo.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new todo successfully', async () => {
    const newTodo = {
      name: 'New Test Todo',
      isCompleted: false,
    };

    const response = await request(app)
      .post('/todo/create')
      .send(newTodo)
      .set('Authorization', `${token}`)
      .expect(201);

    expect(response.body.msg).toBe('Todo created successfully');
    expect(response.body.todo).toBeDefined();
  });

  it('should toggle a todo status successfully', async () => {
    const response = await request(app)
      .put(`/todo/toggle/${todoId}`)
      .send({ isCompleted: true })
      .set('Authorization', `${token}`)
      .expect(200);

    expect(response.body.msg).toBe('Todo Updated Successfully');
    expect(response.body.todo.isCompleted).toBe(true);
  });

  it('should retrieve a todo by ID', async () => {
    const response = await request(app)
      .get(`/todo/get/${todoId}`)
      .set('Authorization', `${token}`)
      .expect(200);

    expect(response.body.name).toBe('Test Todo');
    expect(response.body.isCompleted).toBe(true);
  });

  it('should retrieve all todos for a user', async () => {
    const response = await request(app)
      .get('/todo/find/all')
      .set('Authorization', `${token}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].userId).toBe(userId);
  });

  it('should retrieve all completed todos for a user', async () => {
    await request(app)
      .put(`/todo/toggle/${todoId}`)
      .send({ isCompleted: true })
      .set('Authorization', `${token}`);

    const response = await request(app)
      .get('/todo/completed/all')
      .set('Authorization', `${token}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.some((todo: any) => todo.isCompleted)).toBe(true);
  });

  it('should retrieve all incompleted todos for a user', async () => {
    const response = await request(app)
      .get('/todo/incompleted/all')
      .set('Authorization', `${token}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.every((todo: any) => !todo.isCompleted)).toBe(true);
  });

  it('should update a todo successfully', async () => {
    const updatedTodoData = {
      name: 'Updated Test Todo',
      isCompleted: true,
    };

    const response = await request(app)
      .put(`/todo/update/${todoId}`)
      .send(updatedTodoData)
      .set('Authorization', `${token}`)
      .expect(200);

    expect(response.body.msg).toBe('Todo updated successfully');
    expect(response.body.todo.name).toBe('Updated Test Todo');
    expect(response.body.todo.isCompleted).toBe(true);
  });

  it('should delete a todo successfully', async () => {
    await request(app)
      .delete(`/todo/delete/${todoId}`)
      .set('Authorization', `${token}`)
      .expect(200);

    const checkTodo = await prisma.todo.findUnique({ where: { id: todoId } });
    expect(checkTodo).toBeNull();
  });
});
