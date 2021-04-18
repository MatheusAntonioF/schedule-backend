import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateEventUseCase } from '@modules/events/useCases/createEvent/CreateEventUseCase';
import { DeleteEventUseCase } from '@modules/events/useCases/deleteEvent/DeleteEventUseCase';
import { ListEventsUseCase } from '@modules/events/useCases/listEvents/ListEventsUseCase';
import { ShowEventUseCase } from '@modules/events/useCases/showEvent/ShowEventUseCase';
import { UpdateEventUseCase } from '@modules/events/useCases/updateEvent/UpdateEventUseCase';

class EventsController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id: event_id } = request.params;

    const foundEvent = await container
      .resolve(ShowEventUseCase)
      .execute(event_id);

    return response.status(200).json(foundEvent);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const { tag_id, start_date, end_date } = request.query;

    const { id: user_id } = request.user;

    const allEvents = await container
      .resolve(ListEventsUseCase)
      .execute({ user_id, tag_id, start_date, end_date });

    return response.status(200).json(allEvents);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, description, date, tags_name } = request.body;

    const { id: user_id } = request.user;

    const createdEvent = await container
      .resolve(CreateEventUseCase)
      .execute({ name, description, date, user_id, tags_name });

    return response.status(201).json(createdEvent);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id: event_id } = request.params;

    const { name, description, date } = request.body;

    const updatedEvent = await container
      .resolve(UpdateEventUseCase)
      .execute({ event_id, name, description, date });

    return response.status(200).json(updatedEvent);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id: event_id } = request.params;

    await container.resolve(DeleteEventUseCase).execute(event_id);

    return response.status(204).send();
  }
}

export { EventsController };
