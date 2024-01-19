import { Router } from 'express';
import {
  createTodo,
  deleteTodo,
  getAllCompletedTodos,
  getAllTodos,
  getInCompletedTodos,
  getTodoById,
  toggleTodoStatus,
  updateTodo,
} from '../controllers/todo.controller';
import { authMethods } from '../middlewares/auth';

const router = Router();

router.use(authMethods.isAuthenicated);

router.post('/create', createTodo);
router.put('/toggle/:id', toggleTodoStatus);
router.put('/update/:id', updateTodo);
router.get('/find/all', getAllTodos);
router.get('/completed/all', getAllCompletedTodos);
router.get('/incompleted/all', getInCompletedTodos);
router.get('/get/:id', getTodoById);
router.delete('/delete/:id', deleteTodo);

export const TodoRoutes: Router = router;
