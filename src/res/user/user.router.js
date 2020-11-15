import { Router } from 'express';
import controllers, { profile, update } from './user.controllers';

const router = Router();

router.route('/').get(profile).put(update);

export default router;
