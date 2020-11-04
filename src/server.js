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
import { protect, reAuth, signin, signup } from './utils/auth';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import { logger } from './utils/logger';

var certificate = fs.readFileSync(
  path.join(__dirname, 'sslcert/localhost+2.pem'),
  'utf8'
);
var privateKey = fs.readFileSync(
  path.join(__dirname, 'sslcert/localhost+2-key.pem'),
  'utf8'
);

const xsrfProtection = csrf({
  cookie: true,
  secure: true,
  sameSite: 'strict',
});
export const app = express();
const httpsServer = https.createServer(
  { key: privateKey, cert: certificate },
  app
);

app.disable('x-powered-by');
app.use(
  cors({
    origin: 'https://127.0.0.1:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: [
      'Origin',
      'Content-Type',
      'X-Requested-With',
      'Accept',
      'x-xsrf-token',
    ],
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

app.get('/', xsrfProtection, (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.status(200).end();
});

app.post('/signup', signup);
app.post('/signin', xsrfProtection, signin);
app.use('/api', protect);
app.use('/api', reAuth);
app.use('/api/user', userRouter);
app.use('/api/item', xsrfProtection, itemRouter);

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
