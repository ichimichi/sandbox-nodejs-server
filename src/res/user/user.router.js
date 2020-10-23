import { Router } from 'express';
import { User } from './user.model';

const router = Router();

router
  .get('/', (req, res) => {
    User.find((err, users) => {
      if (err) {
        console.log(err);
      } else {
        res.json(users);
      }
    });
  })
  .post('/', (req, res) => {
    const newUser = User(req.body);
    newUser.save((err, createdUser) => {
      if (err) {
        console.log(err);
      } else {
        res.json(createdUser);
      }
    });
  });

export default router;
