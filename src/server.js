import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connect } from './utils/db';
import userRouter from './res/user/user.router';
import itemRouter from './res/item/item.router';
import { protect, signin, signup } from './utils/auth';

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

app.post('/signup', signup);
app.post('/signin', signin);
app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/item', itemRouter);

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
