import { Router } from 'express';
import { updateOne } from '../../utils/crud';
import controllers from './user.controllers';

const router = Router();

router.route('/').get(controllers.getAll).post(controllers.createOne);

router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne);

export default router;
