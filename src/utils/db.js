import 'dotenv/config';
import mongoose from 'mongoose';

export const connect = (
  url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds221645.mlab.com:21645/react-sandbox-db`,
  opts = {}
) => {
  return mongoose.connect(url, {
    ...opts,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
