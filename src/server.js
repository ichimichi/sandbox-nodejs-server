import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connect } from './utils/db';
import userRouter from './res/user/user.router';

export const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/user', userRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};
