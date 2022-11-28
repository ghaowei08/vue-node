import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { join } from 'path';
import dotenv from 'dotenv';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import logger from './services/logger';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const path_joined_index = join(__dirname, '..', '../client/dist/index.html');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(join(__dirname, '..', '../client/dist')))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path} `);
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path_joined_index);
});

const http = createServer(app);
http.listen(port, async () => {
  logger.info(`Server listening on port http://localhost:${port}`);
});