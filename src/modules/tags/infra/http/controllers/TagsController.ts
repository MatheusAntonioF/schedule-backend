import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTagsUseCase } from '@modules/tags/useCases/createTag/CreateTagUseCase';
import { DeleteTagUseCase } from '@modules/tags/useCases/deleteTag/DeleteTagUseCase';
import { ListTagsUseCase } from '@modules/tags/useCases/listTags/ListTagsUseCase';

class TagsController {
  async list(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const allTags = await container.resolve(ListTagsUseCase).execute(user_id);

    return response.status(200).json(allTags);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, colorHex } = request.body;

    const { id: user_id } = request.user;

    const createdTag = await container
      .resolve(CreateTagsUseCase)
      .execute({ name, colorHex, user_id });

    return response.status(201).json(createdTag);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id: tag_id } = request.params;

    await container.resolve(DeleteTagUseCase).execute(tag_id);

    return response.status(204).send();
  }
}

export { TagsController };
