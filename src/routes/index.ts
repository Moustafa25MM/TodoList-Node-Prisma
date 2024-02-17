import { Router } from 'express';
import { AuthRoutes } from './auth';
import { TodoRoutes } from './todo';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/todo', TodoRoutes);

export const indexRouter: Router = router;
