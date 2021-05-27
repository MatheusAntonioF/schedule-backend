import { addDays } from 'date-fns';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { jwtConfig } from '@config/jwt';
import { IUsersRepository } from '@modules/users/interfaces/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/interfaces/IUsersTokensRepository';
import { IHashProvider } from '@modules/users/providers/HashProvider/interfaces/IHashProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  refresh_token: string;
  user_id: string;
}

@injectable()
class SignInSessionUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (!userAlreadyExists)
      throw new AppError('Email or password doesnt match');

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      userAlreadyExists.password
    );

    if (!passwordMatch) throw new AppError('Email or password doesnt match');

    const { id: user_id } = userAlreadyExists;

    const { expiresIn, secret, expiresInRefreshToken } = jwtConfig;

    const dateToExpiresRefreshToken = addDays(
      new Date(),
      expiresInRefreshToken
    );

    const refreshToken = await this.usersTokensRepository.generate({
      refresh_token: uuidV4(),
      expires_in: dateToExpiresRefreshToken,
      user_id,
    });

    const token = sign({}, secret, {
      subject: user_id,
      expiresIn,
    });

    return { user_id, token, refresh_token: refreshToken };
  }
}

export { SignInSessionUseCase };
