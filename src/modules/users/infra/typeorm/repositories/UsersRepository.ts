import { getRepository, Repository } from 'typeorm';

import { IUserCreate } from '@modules/users/dtos/IUserCreate';
import { IUsersRepository } from '@modules/users/interfaces/IUsersRepository';

import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  async create({ name, email, password }: IUserCreate): Promise<User> {
    const userToSave = this.usersRepository.create({ name, email, password });

    console.log(userToSave);

    await this.usersRepository.save(userToSave);

    return userToSave;
  }

  async findByEmail(email: string): Promise<User | null> {
    const foundUser = await this.usersRepository.findOne({ where: { email } });

    return foundUser;
  }
}

export { UsersRepository };
