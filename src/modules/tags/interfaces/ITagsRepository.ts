import { ITagCreate } from '../infra/dtos/ITagCreate';
import { Tag } from '../infra/typeorm/entities/Tag';

export interface ITagsRepository {
  create(tagData: ITagCreate): Promise<Tag>;
  findByName(name: string): Promise<Tag | null>;
}
