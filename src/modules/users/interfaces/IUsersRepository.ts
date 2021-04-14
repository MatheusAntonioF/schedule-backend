import { IUserCreate } from '../dtos/IUserCreate';
import { User } from '../infra/typeorm/entities/User';

export interface IUsersRepository {
  create(userInput: IUserCreate): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(user_id: string): Promise<User | null>;
  delete(user_id: string): Promise<boolean>;
}
