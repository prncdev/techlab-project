import express, { Application, json as JSONBody, urlencoded } from 'express';
import cors from 'cors'; // Import cors
require('dotenv').config();

import connectDB from './config/database.config';
import { ProjectRoute, UserRoute } from './routes';
import { errorHandler } from './middlewares/errorhandle';

const dbURL = process.env.DATABASE_URI ?? "mongodb://localhost:27017/FullStack";
const port = process.env.PORT ?? 5000;
const app: Application = express();

connectDB(dbURL);

app.use(cors()); // Use cors middleware

app.use(JSONBody());
app.use(urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.status(200).send("<p>Hello World!</p>");
});

app.use('/user', UserRoute);
app.use('/project', ProjectRoute);

app.use(errorHandler);
app.listen(port, () => console.log(`Ctrl + L-click. visit =>' http://localhost:${port}/`));
