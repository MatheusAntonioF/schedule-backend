import { endOfDay, startOfDay } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { Between, FindConditions } from 'typeorm';

import { Event } from '@modules/events/infra/typeorm/entities/Event';
import { IEventsRepository } from '@modules/events/interfaces/IEventsRepository';

interface IRequest {
  user_id: string;
  tag_id?: unknown;
  start_date?: unknown;
  end_date?: unknown;
}
@injectable()
class ListEventsUseCase {
  constructor(
    @inject('EventsRepository') private eventsRepository: IEventsRepository
  ) {}

  async execute({
    user_id,
    tag_id,
    start_date,
    end_date,
  }: IRequest): Promise<Event[]> {
    if (tag_id)
      return this.eventsRepository.filterEventsByTagId(String(tag_id));

    const wheres = this.prepareFilters({
      user_id,
      start_date,
      end_date,
    });

    const allEvents = await this.eventsRepository.findByGenericFilters(wheres);

    return allEvents;
  }

  prepareFilters({
    user_id,
    start_date,
    end_date,
  }: Omit<IRequest, 'tag_id'>): FindConditions<Event> {
    const wheres: FindConditions<Event> = {};

    if (user_id) wheres.user_id = user_id;

    if (start_date && end_date)
      wheres.date = Between(
        startOfDay(new Date(String(start_date))),
        endOfDay(new Date(String(end_date)))
      );

    return wheres;
  }
}

export { ListEventsUseCase };
