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

    await this.usersRepository.save(userToSave);

    return userToSave;
  }

  async findByEmail(email: string): Promise<User | null> {
    const foundUser = await this.usersRepository.findOne({ where: { email } });

    return foundUser;
  }

  async findById(id: string): Promise<User | null> {
    const foundUser = await this.usersRepository.findOne(id);

    return foundUser;
  }

  async delete(id: string): Promise<boolean> {
    const deletedUser = await this.usersRepository.delete({ id });

    return !!deletedUser;
  }
}

export { UsersRepository };
