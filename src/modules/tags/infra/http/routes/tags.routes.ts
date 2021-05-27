import { Router } from 'express';

import { ensureAuthenticate } from '@shared/http/middlewares/ensureAuthenticate';

import { TagsController } from '../controllers/TagsController';

const tagsRouter = Router();

const tagsController = new TagsController();

tagsRouter.use(ensureAuthenticate);

tagsRouter.post('/', tagsController.create);
tagsRouter.get('/', tagsController.list);
tagsRouter.delete('/:id', tagsController.delete);

export { tagsRouter };
