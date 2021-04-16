import { inject, injectable } from 'tsyringe';

import { IEventCreate } from '@modules/events/dtos/IEventCreate';
import { Event } from '@modules/events/infra/typeorm/entities/Event';
import { IEventsRepository } from '@modules/events/interfaces/IEventsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateEventUseCase {
  constructor(
    @inject('EventsRepository') private eventsRepository: IEventsRepository
  ) {}

  async execute({
    name,
    description,
    date,
    user_id,
  }: IEventCreate): Promise<Event> {
    const eventAlreadyExists = await this.eventsRepository.findByName({
      filterBy: name,
      user_id,
    });

    if (eventAlreadyExists) throw new AppError('Event already exists');

    const createdEvent = await this.eventsRepository.create({
      name,
      description,
      date: new Date(date),
      user_id,
    });

    return createdEvent;
  }
}

export { CreateEventUseCase };
