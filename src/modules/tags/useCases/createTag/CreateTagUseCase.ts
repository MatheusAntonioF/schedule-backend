import { inject, injectable } from 'tsyringe';

import { ITagCreate } from '@modules/tags/dtos/ITagCreate';
import { Tag } from '@modules/tags/infra/typeorm/entities/Tag';
import { ITagsRepository } from '@modules/tags/interfaces/ITagsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateTagsUseCase {
  constructor(
    @inject('TagsRepository') private tagsRepository: ITagsRepository
  ) {}

  async execute({ name, colorHex, user_id }: ITagCreate): Promise<Tag> {
    const tagAlredyExists = await this.tagsRepository.findByName(user_id, name);

    if (tagAlredyExists) throw new AppError('This tag already exists');

    const createdTag = await this.tagsRepository.create({
      name,
      colorHex,
      user_id,
    });

    return createdTag;
  }
}

export { CreateTagsUseCase };
