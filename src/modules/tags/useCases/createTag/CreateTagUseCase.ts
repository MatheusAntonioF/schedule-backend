import { inject, injectable } from 'tsyringe';

import { ITagCreate } from '@modules/tags/infra/dtos/ITagCreate';
import { Tag } from '@modules/tags/infra/typeorm/entities/Tag';
import { ITagsRepository } from '@modules/tags/interfaces/ITagsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateTagsUseCase {
  constructor(
    @inject('TagsRepository') private tagsRepository: ITagsRepository
  ) {}

  async execute({ name, colorHex }: ITagCreate): Promise<Tag> {
    const tagAlredyExists = await this.tagsRepository.findByName(name);

    if (tagAlredyExists) throw new AppError('This tag already exists');

    const createdTag = await this.tagsRepository.create({ name, colorHex });

    return createdTag;
  }
}

export { CreateTagsUseCase };
