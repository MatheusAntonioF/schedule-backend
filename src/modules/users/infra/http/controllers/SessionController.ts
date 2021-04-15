import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SignInSessionUseCase } from '@modules/users/useCases/signInSession/SignInSessionUseCase';

class SessionController {
  async signIn(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const { user_id, token } = await container
      .resolve(SignInSessionUseCase)
      .execute({ email, password });

    return response.status(200).json({ user_id, token });
  }
}

export { SessionController };
