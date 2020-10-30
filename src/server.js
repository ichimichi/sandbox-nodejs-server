import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import https from 'https';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connect } from './utils/db';
import userRouter from './res/user/user.router';
import itemRouter from './res/item/item.router';
import { protect, signin, signup } from './utils/auth';
import cookieParser from 'cookie-parser';
import { logger } from './utils/logger';

var certificate = fs.readFileSync(
  path.join(__dirname, 'sslcert/localhost+2.pem'),
  'utf8'
);
var privateKey = fs.readFileSync(
  path.join(__dirname, 'sslcert/localhost+2-key.pem'),
  'utf8'
);

var credentials = { key: privateKey, cert: certificate };

export const app = express();
const httpsServer = https.createServer(credentials, app);

app.disable('x-powered-by');
app.use(
  cors({
    origin: 'https://127.0.0.1:3000',
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan('dev'));
// app.use(logger);

app.get('/', (req, res) => {
  res.json('hello');
});

app.post('/signup', signup);
app.post('/signin', signin);
app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/item', itemRouter);

export const start = async () => {
  try {
    await connect();
    httpsServer.listen(process.env.PORT, () => {
      console.log(
        `listening on port ${process.env.PORT} : https://127.0.0.1:${process.env.PORT}`
      );
    });
  } catch (e) {
    console.error(e);
  }
};
