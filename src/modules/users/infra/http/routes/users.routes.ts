import { Router } from 'express';

import { ensureAuthenticate } from '../../../../../shared/http/middlewares/ensureAuthenticate';
import { UsersController } from '../controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post('/', usersController.create);

usersRouter.use(ensureAuthenticate);

usersRouter.get('/:id', usersController.show);
usersRouter.delete('/:id', usersController.delete);

export { usersRouter };
