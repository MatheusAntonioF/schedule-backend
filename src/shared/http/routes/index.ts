import { Router } from 'express';

import { eventRouter } from '@modules/events/infra/http/routes/events.routes';
import { tagsRouter } from '@modules/tags/infra/http/routes/tags.routes';
import { refreshTokenRouter } from '@modules/users/infra/http/routes/refreshToken.routes';
import { sessionRouter } from '@modules/users/infra/http/routes/session.routes';
import { usersRouter } from '@modules/users/infra/http/routes/users.routes';

const rootRouter = Router();

rootRouter.use('/users', usersRouter);
rootRouter.use('/session', sessionRouter);
rootRouter.use('/tags', tagsRouter);
rootRouter.use('/events', eventRouter);
rootRouter.use('/refresh-token', refreshTokenRouter);

export { rootRouter };
