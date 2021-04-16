import { inject, injectable } from 'tsyringe';

import { Event } from '@modules/events/infra/typeorm/entities/Event';
import { IEventsRepository } from '@modules/events/interfaces/IEventsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ShowEventUseCase {
  constructor(
    @inject('EventsRepository') private eventsRepository: IEventsRepository
  ) {}

  async execute(event_id: string): Promise<Event> {
    const eventDoesntExists = await this.eventsRepository.findById(event_id);

    if (!eventDoesntExists) throw new AppError('Event doesnt exists', 404);

    return eventDoesntExists;
  }
}

export { ShowEventUseCase };
