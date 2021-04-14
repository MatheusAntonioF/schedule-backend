import { inject, injectable } from 'tsyringe';

import { IUserCreate } from '@modules/users/dtos/IUserCreate';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/interfaces/IUsersRepository';

@injectable()
class CreateUsersUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: IUserCreate): Promise<User> {
    const usersAlreadyExists = await this.usersRepository.findByEmail(email);

    if (usersAlreadyExists) throw new Error('User already exists');

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return createdUser;
  }
}

export { CreateUsersUseCase };
