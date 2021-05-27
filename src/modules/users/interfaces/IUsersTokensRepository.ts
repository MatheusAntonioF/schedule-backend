import { IUserTokenCreate } from '../dtos/IUserTokenCreate';
import { UserToken } from '../infra/typeorm/entities/UserToken';

export interface IUsersTokensRepository {
  generate(data: IUserTokenCreate): Promise<string>;
  delete(token: string): Promise<void>;
  find(token: string): Promise<UserToken | null>;
}
