import 'dotenv/config';
import mongoose from 'mongoose';

export const connect = (
  url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  opts = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
  }
) => {
  return mongoose.connect(url, {
    ...opts,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};
