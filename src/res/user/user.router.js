import { Router } from 'express';
import controllers from './user.controllers';

const router = Router();

router.route('/').get(controllers.getAll).post(controllers.createOne);

router.route('/:id').get(controllers.getOne).delete(controllers.removeOne);

export default router;
