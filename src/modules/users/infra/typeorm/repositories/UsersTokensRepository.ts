import { getRepository, Repository } from 'typeorm';

import { IUserTokenCreate } from '@modules/users/dtos/IUserTokenCreate';
import { IUsersTokensRepository } from '@modules/users/interfaces/IUsersTokensRepository';

import { UserToken } from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private usersTokensRepository: Repository<UserToken>;

  constructor() {
    this.usersTokensRepository = getRepository(UserToken);
  }
  async find(token: string): Promise<UserToken> {
    const foundToken = await this.usersTokensRepository.findOne({
      where: { refresh_token: token },
    });

    return foundToken;
  }

  async generate({
    refresh_token,
    expires_in,
    user_id,
  }: IUserTokenCreate): Promise<string> {
    const createdRefreshToken = this.usersTokensRepository.create({
      refresh_token,
      expires_in,
      user_id,
    });

    await this.usersTokensRepository.save(createdRefreshToken);

    return createdRefreshToken.refresh_token;
  }

  async delete(token: string): Promise<void> {
    await this.usersTokensRepository.delete({ refresh_token: token });
  }
}

export { UsersTokensRepository };
