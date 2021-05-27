import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GenerateTokenUseCase } from '@modules/users/useCases/generateToken/GenerateTokenUseCase';

class RefreshTokenController {
  async create(request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.params;

    const { token } = await container
      .resolve(GenerateTokenUseCase)
      .execute({ refresh_token });

    return response.json({ token });
  }
}

export { RefreshTokenController };
