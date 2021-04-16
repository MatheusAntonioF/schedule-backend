import { Router } from 'express';

import { ensureAuthenticate } from '@modules/users/infra/http/middlewares/ensureAuthenticate';

import { EventsController } from '../controllers/EventsController';

const eventRouter = Router();

const eventsController = new EventsController();

eventRouter.use(ensureAuthenticate);

eventRouter.post('/', eventsController.create);
eventRouter.get('/', eventsController.list);
eventRouter.delete('/:id', eventsController.delete);

export { eventRouter };
