import { Router } from 'express';
import { createTodo, toggleTodoStatus } from '../controllers/todo.controller';
import { authMethods } from '../middlewares/auth';

const router = Router();

router.use(authMethods.isAuthenicated);

router.post('/create', createTodo);
router.put('/update/:id', toggleTodoStatus);

export const TodoRoutes: Router = router;
