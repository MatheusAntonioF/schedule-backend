import { ITagCreate } from '../dtos/ITagCreate';
import { Tag } from '../infra/typeorm/entities/Tag';

export interface ITagsRepository {
  create(tagData: ITagCreate): Promise<Tag>;
  findAll(user_id: string): Promise<Tag[]>;
  findByNames(user_id: string, tags_names: string[]): Promise<Tag[]>;
  findByName(user_id: string, name: string): Promise<Tag | null>;
  findById(id: string): Promise<Tag | null>;
  delete(id: string): Promise<boolean>;
}
