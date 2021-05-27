import { isPast } from 'date-fns';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { jwtConfig } from '@config/jwt';
import { IUsersTokensRepository } from '@modules/users/interfaces/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  refresh_token: string;
}

interface IResponse {
  token: string;
}

@injectable()
class GenerateTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute({ refresh_token }: IRequest): Promise<IResponse> {
    const refreshToken = await this.usersTokensRepository.find(refresh_token);

    const isExpiredToken = isPast(new Date(refreshToken.expires_in));

    if (!refreshToken || isExpiredToken) {
      await this.usersTokensRepository.delete(refresh_token);

      throw new AppError('Invalid refresh token', 401);
    }

    const { user_id } = refreshToken;

    const { expiresIn, secret } = jwtConfig;

    const newToken = sign({}, secret, {
      subject: user_id,
      expiresIn,
    });

    return { token: newToken };
  }
}

export { GenerateTokenUseCase };
