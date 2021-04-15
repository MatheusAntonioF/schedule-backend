import { inject, injectable } from 'tsyringe';

import { ITagsRepository } from '@modules/tags/interfaces/ITagsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteTagUseCase {
  constructor(
    @inject('TagsRepository') private tagsRepository: ITagsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const tagAlreadyExists = await this.tagsRepository.findById(id);

    if (!tagAlreadyExists) throw new AppError('This tag doesnt exists', 404);

    await this.tagsRepository.delete(id);
  }
}

export { DeleteTagUseCase };
