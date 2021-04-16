import { Tag } from '@modules/tags/infra/typeorm/entities/Tag';

export interface IEventCreate {
  name: string;
  description: string;
  user_id: string;
  date: Date;
  tags: Tag[];
}
