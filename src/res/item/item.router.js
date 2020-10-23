import { Router } from 'express';
import { Item } from './item.model';

const router = Router();

router
  .get('/', (req, res) => {
    Item.find((err, items) => {
      if (err) {
        console.log(err);
      } else {
        res.json(items);
      }
    });
  })
  .post('/', (req, res) => {
    const newItem = Item(req.body);
    newItem.save((err, createdItem) => {
      if (err) {
        console.log(err);
      } else {
        res.json(createdItem);
      }
    });
  });

export default router;
