import { Router } from 'express';
import { Item } from './item.model';

const router = Router();

router
  .get('/', async (req, res) => {
    try {
      const items = await Item.find();
      res.status(200).json(items);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  })
  .post('/', async (req, res) => {
    try {
      const createdItem = await Item.create(req.body);
      res.status(201).json(createdItem);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  });

export default router;
