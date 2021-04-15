import { inject, injectable } from 'tsyringe';

import { Tag } from '@modules/tags/infra/typeorm/entities/Tag';
import { ITagsRepository } from '@modules/tags/interfaces/ITagsRepository';

@injectable()
class ListTagsUseCase {
  constructor(
    @inject('TagsRepository') private tagsRepository: ITagsRepository
  ) {}

  async execute(): Promise<Tag[]> {
    const allTags = await this.tagsRepository.findAll();

    return allTags;
  }
}

export { ListTagsUseCase };
