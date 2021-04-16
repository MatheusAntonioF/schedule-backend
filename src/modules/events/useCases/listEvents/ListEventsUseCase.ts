import { inject, injectable } from 'tsyringe';

import { Event } from '@modules/events/infra/typeorm/entities/Event';
import { IEventsRepository } from '@modules/events/interfaces/IEventsRepository';

@injectable()
class ListEventsUseCase {
  constructor(
    @inject('EventsRepository') private eventsRepository: IEventsRepository
  ) {}

  async execute(user_id: string): Promise<Event[]> {
    const allEvents = await this.eventsRepository.findAll(user_id);

    return allEvents;
  }
}

export { ListEventsUseCase };
