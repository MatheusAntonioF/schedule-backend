import { getRepository, Repository } from 'typeorm';

import { ITagsRepository } from '@modules/tags/interfaces/ITagsRepository';

import { ITagCreate } from '../../../dtos/ITagCreate';
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

  async findAll(): Promise<Tag[]> {
    const allTags = await this.tagsRepository.find();

    return allTags;
  }

  async findById(id: string): Promise<Tag> {
    const foundTag = await this.tagsRepository.findOne({ where: { id } });

    return foundTag;
  }

  async create({ name, colorHex }: ITagCreate): Promise<Tag> {
    const tagToSave = this.tagsRepository.create({ name, colorHex });

    await this.tagsRepository.save(tagToSave);

    return tagToSave;
  }

  async delete(id: string): Promise<boolean> {
    const deletedTag = await this.tagsRepository.delete(id);

    return !!deletedTag;
  }
}

export { TagsRepository };
