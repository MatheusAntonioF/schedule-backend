import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/interfaces/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string): Promise<void> {
    const userDoesntExists = await this.usersRepository.findById(user_id);

    if (!userDoesntExists) throw new AppError('User dosent exists', 404);

    const { id } = userDoesntExists;

    await this.usersRepository.delete(id);
  }
}

export { DeleteUserUseCase };
