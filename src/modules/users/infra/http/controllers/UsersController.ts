import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUsersUseCase } from '@modules/users/useCases/createUsers/CreateUsersUseCase';
import { DeleteUserUseCase } from '@modules/users/useCases/deleteUser/DeleteUserUseCase';
import { ShowUserUseCase } from '@modules/users/useCases/showUser/ShowUserUseCase';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createdUser = await container
      .resolve(CreateUsersUseCase)
      .execute({ name, email, password });

    return response.status(201).json(createdUser);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.params;

    const foundUser = await container.resolve(ShowUserUseCase).execute(user_id);

    return response.status(200).json(foundUser);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.params;

    await container.resolve(DeleteUserUseCase).execute(user_id);

    return response.status(204).send();
  }
}

export { UsersController };
