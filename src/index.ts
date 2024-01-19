import express, { Express, Response, Request } from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './database';
import { indexRouter } from './routes';
import cors from 'cors';
import prisma from './client';
import { errorHandler } from './middlewares/errorhandler';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(morgan('tiny'));

// const mongoUrl: string = process.env.MONGO_URL as string;
// connectDB(mongoUrl);

prisma.$connect().then(() => {
  console.log('Successfully Connected to Database.');
});

app.use(cors());

app.use(indexRouter);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`The server is running on port " ${port}"`);
});
