import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { jwtConfig } from '@config/jwt';
import { IUsersRepository } from '@modules/users/interfaces/IUsersRepository';
import { IHashProvider } from '@modules/users/providers/HashProvider/interfaces/IHashProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user_id: string;
}

@injectable()
class SignInSessionUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
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

    const { expiresIn, secret } = jwtConfig;

    const { id: user_id } = userAlreadyExists;

    const token = sign({}, secret, {
      subject: user_id,
      expiresIn,
    });

    return { user_id, token };
  }
}

export { SignInSessionUseCase };
