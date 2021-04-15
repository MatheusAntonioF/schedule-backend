import { Router } from 'express';

import { ensureAuthenticate } from '@modules/users/infra/http/middlewares/ensureAuthenticate';

import { TagsController } from '../controllers/TagsController';

const tagsRouter = Router();

const tagsController = new TagsController();

tagsRouter.use(ensureAuthenticate);

tagsRouter.post('/', tagsController.create);
tagsRouter.delete('/:id', tagsController.delete);

export { tagsRouter };
