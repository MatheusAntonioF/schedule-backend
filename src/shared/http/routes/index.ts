import { Router } from 'express';

import { sessionRouter } from '@modules/users/infra/http/routes/session.routes';
import { usersRouter } from '@modules/users/infra/http/routes/users.routes';

const rootRouter = Router();

rootRouter.use('/users', usersRouter);
rootRouter.use('/session', sessionRouter);

export { rootRouter };
