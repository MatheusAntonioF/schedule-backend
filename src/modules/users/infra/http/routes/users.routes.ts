import { Router } from 'express';

import { UsersController } from '../controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post('/', usersController.create);
usersRouter.get('/:id', usersController.show);
usersRouter.delete('/:id', usersController.delete);

export { usersRouter };
