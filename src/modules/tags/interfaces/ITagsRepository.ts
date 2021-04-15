import { ITagCreate } from '../dtos/ITagCreate';
import { Tag } from '../infra/typeorm/entities/Tag';

export interface ITagsRepository {
  create(tagData: ITagCreate): Promise<Tag>;
  findByName(name: string): Promise<Tag | null>;
  findById(id: string): Promise<Tag | null>;
  delete(id: string): Promise<boolean>;
}
