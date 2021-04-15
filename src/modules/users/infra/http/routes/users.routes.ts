import { Router } from 'express';

import { UsersController } from '../controllers/UsersController';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post('/', usersController.create);

usersRouter.use(ensureAuthenticate);

usersRouter.get('/:id', usersController.show);
usersRouter.delete('/:id', usersController.delete);

export { usersRouter };
