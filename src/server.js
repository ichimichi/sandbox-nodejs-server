import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

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

export const start = () => {
  app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
};
