import express, { Express, Response, Request } from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './database';
import { indexRouter } from './routes';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(morgan('tiny'));

const mongoUrl: string = process.env.MONGO_URL as string;
connectDB(mongoUrl);

app.use(indexRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`The server is running on port " ${port}"`);
});
