import 'dotenv/config';
import { response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../res/user/user.model';

export const newAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXP,
  });
};

export const verifyAccessToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'need email and password' });
  }

  try {
    const user = await User.create(req.body);
    const accessToken = newAccessToken(user);
    res.cookie('access_token', accessToken, {
      maxAge: process.env.JWT_ACCESS_EXP * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.status(200).end();
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'need email and password' });
  }

  const invalid = { message: 'Invalid email and passoword combination' };

  try {
    const user = await User.findOne({ email: req.body.email })
      .select('email password')
      .exec();

    if (!user) {
      return res.status(401).json(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).json(invalid);
    }

    const accessToken = newAccessToken(user);
    res.cookie('access_token', accessToken, {
      maxAge: process.env.JWT_ACCESS_EXP * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const protect = async (req, res, next) => {
  const token = req.cookies['access_token'];

  let payload;
  try {
    payload = await verifyAccessToken(token);
  } catch (e) {
    return res.status(401).end();
  }
  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};
