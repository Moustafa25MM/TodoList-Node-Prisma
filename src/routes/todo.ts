import { Router } from 'express';
import { createTodo } from '../controllers/todo.controller';
import { authMethods } from '../middlewares/auth';

const router = Router();

router.use(authMethods.isAuthenicated);
router.post('/create', createTodo);

export const TodoRoutes: Router = router;
