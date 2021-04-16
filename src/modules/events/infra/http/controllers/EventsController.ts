import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateEventUseCase } from '@modules/events/useCases/createEvent/CreateEventUseCase';

class EventsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, description, date } = request.body;

    const { id: user_id } = request.user;

    const createdEvent = await container
      .resolve(CreateEventUseCase)
      .execute({ name, description, date, user_id });

    return response.status(201).json(createdEvent);
  }
}

export { EventsController };
