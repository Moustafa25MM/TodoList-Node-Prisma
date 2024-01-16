import { Router } from 'express';
import { UserRoutes } from './user';
import { TodoRoutes } from './todo';

const router = Router();

router.use('/user', UserRoutes);
router.use('/todo', TodoRoutes);

export const indexRouter: Router = router;
