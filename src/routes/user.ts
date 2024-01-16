import { Router } from 'express';
import { createUser, loginUser } from '../controllers/user.controller';

const router = Router();

router.post('/create', createUser);
router.post('/login', loginUser);

export const UserRoutes: Router = router;