import request from 'supertest';
import { app } from '..';
import prisma from '../client';
import bcrypt from 'bcrypt';

describe('User Routes', () => {
  beforeAll(async () => {
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
      .post('/create/user')
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
      .post('/login/user')
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
      .post('/login/user')
      .send(credentials)
      .expect(404);

    expect(response.body.error).toBe('Invalid email or password');
  });

  // Add more tests as needed for your other controller functions
});
