import { Router } from 'express';

import { usersRouter } from '@modules/users/infra/http/routes/users.routes';

const rootRouter = Router();

rootRouter.use('/users', usersRouter);

export { rootRouter };
