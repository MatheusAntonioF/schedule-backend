import { getRepository, In, Repository } from 'typeorm';

import { ITagsRepository } from '@modules/tags/interfaces/ITagsRepository';

import { ITagCreate } from '../../../dtos/ITagCreate';
import { Tag } from '../entities/Tag';

class TagsRepository implements ITagsRepository {
  private tagsRepository: Repository<Tag>;

  constructor() {
    this.tagsRepository = getRepository(Tag);
  }
  async findByNames(user_id: string, tags_names: string[]): Promise<Tag[]> {
    const foundTags = await this.tagsRepository.find({
      where: {
        name: In(tags_names),
        user_id,
      },
    });

    return foundTags;
  }

  async findByName(name: string): Promise<Tag> {
    const foundTag = await this.tagsRepository.findOne({ where: { name } });

    return foundTag;
  }

  async findAll(): Promise<Tag[]> {
    const allTags = await this.tagsRepository.find();

    return allTags;
  }

  async findById(id: string): Promise<Tag> {
    const foundTag = await this.tagsRepository.findOne({ where: { id } });

    return foundTag;
  }

  async create({ name, colorHex, user_id }: ITagCreate): Promise<Tag> {
    const tagToSave = this.tagsRepository.create({ name, colorHex, user_id });

    await this.tagsRepository.save(tagToSave);

    return tagToSave;
  }

  async delete(id: string): Promise<boolean> {
    const deletedTag = await this.tagsRepository.delete(id);

    return !!deletedTag;
  }
}

export { TagsRepository };
