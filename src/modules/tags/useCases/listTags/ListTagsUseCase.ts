import { inject, injectable } from 'tsyringe';

import { Tag } from '@modules/tags/infra/typeorm/entities/Tag';
import { ITagsRepository } from '@modules/tags/interfaces/ITagsRepository';

@injectable()
class ListTagsUseCase {
  constructor(
    @inject('TagsRepository') private tagsRepository: ITagsRepository
  ) {}

  async execute(user_id: string): Promise<Tag[]> {
    const allTags = await this.tagsRepository.findAll(user_id);

    return allTags;
  }
}

export { ListTagsUseCase };
