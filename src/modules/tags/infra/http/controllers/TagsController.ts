import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTagsUseCase } from '@modules/tags/useCases/createTag/CreateTagUseCase';

class TagsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, colorHex } = request.body;

    const createdTag = await container
      .resolve(CreateTagsUseCase)
      .execute({ name, colorHex });

    return response.status(201).json(createdTag);
  }
}

export { TagsController };
