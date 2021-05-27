import { Router } from 'express';

import { ensureAuthenticate } from '@shared/http/middlewares/ensureAuthenticate';

import { EventsController } from '../controllers/EventsController';

const eventRouter = Router();

const eventsController = new EventsController();

eventRouter.use(ensureAuthenticate);

eventRouter.post('/', eventsController.create);
eventRouter.get('/', eventsController.list);
eventRouter.get('/:id', eventsController.show);
eventRouter.delete('/:id', eventsController.delete);
eventRouter.put('/:id', eventsController.update);

export { eventRouter };
