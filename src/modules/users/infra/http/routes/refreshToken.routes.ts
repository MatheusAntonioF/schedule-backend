import { Router } from 'express';

import { RefreshTokenController } from '../controllers/RefreshTokenController';

const refreshTokenRouter = Router();

const refreshTokenController = new RefreshTokenController();

refreshTokenRouter.post('/:refresh_token', refreshTokenController.create);

export { refreshTokenRouter };
