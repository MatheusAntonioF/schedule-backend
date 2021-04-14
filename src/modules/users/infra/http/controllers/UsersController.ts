import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUsersUseCase } from '@modules/users/useCases/createUsers/CreateUsersUseCase';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createdUser = await container
      .resolve(CreateUsersUseCase)
      .execute({ name, email, password });

    return response.status(201).json(createdUser);
  }
}

export { UsersController };
