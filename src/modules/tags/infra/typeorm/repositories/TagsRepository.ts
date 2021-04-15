import { getRepository, Repository } from 'typeorm';

import { ITagsRepository } from '@modules/tags/interfaces/ITagsRepository';

import { ITagCreate } from '../../dtos/ITagCreate';
import { Tag } from '../entities/Tag';

class TagsRepository implements ITagsRepository {
  private tagsRepository: Repository<Tag>;

  constructor() {
    this.tagsRepository = getRepository(Tag);
  }
  async findByName(name: string): Promise<Tag> {
    const foundTag = await this.tagsRepository.findOne({ where: { name } });

    return foundTag;
  }
  async create({ name, colorHex }: ITagCreate): Promise<Tag> {
    const tagToSave = this.tagsRepository.create({ name, colorHex });

    await this.tagsRepository.save(tagToSave);

    return tagToSave;
  }
}

export { TagsRepository };
