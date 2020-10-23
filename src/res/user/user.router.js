import { Router } from 'express';
import { User } from './user.model';

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  })
  .post(async (req, res) => {
    try {
      const createdUser = await User.create(req.body);
      res.status(201).json(createdUser);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  });

export default router;
