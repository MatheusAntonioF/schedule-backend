import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/interfaces/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ShowUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string): Promise<User | null> {
    const userAlreadyExists = await this.usersRepository.findById(user_id);

    if (!userAlreadyExists) throw new AppError('User doesnt exists', 404);

    return userAlreadyExists;
  }
}

export { ShowUserUseCase };
