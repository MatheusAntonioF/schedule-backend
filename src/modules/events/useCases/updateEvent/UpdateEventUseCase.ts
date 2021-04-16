import { inject, injectable } from 'tsyringe';

import { Event } from '@modules/events/infra/typeorm/entities/Event';
import { IEventsRepository } from '@modules/events/interfaces/IEventsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  event_id: string;
  name?: string;
  description?: string;
  date?: Date;
}

@injectable()
class UpdateEventUseCase {
  constructor(
    @inject('EventsRepository') private eventsRepository: IEventsRepository
  ) {}

  async execute({
    event_id,
    name,
    description,
    date,
  }: IRequest): Promise<Event> {
    const eventDoesntExists = await this.eventsRepository.findById(event_id);

    if (!eventDoesntExists) throw new AppError('Event doesnt exists', 404);

    const updatedEvent = await this.eventsRepository.update(event_id, {
      name,
      description,
      date,
    });

    console.log(updatedEvent);

    return updatedEvent;
  }
}

export { UpdateEventUseCase };
