import { getRepository, Repository } from 'typeorm';

import { IEventCreate } from '@modules/events/dtos/IEventCreate';
import { IEventFind } from '@modules/events/dtos/IEventFind';
import { IEventsRepository } from '@modules/events/interfaces/IEventsRepository';

import { Event } from '../entities/Event';

class EventsRepository implements IEventsRepository {
  private eventsRepository: Repository<Event>;

  constructor() {
    this.eventsRepository = getRepository(Event);
  }

  async findById(event_id: string): Promise<Event> {
    const foundEvent = await this.eventsRepository.findOne(event_id);

    return foundEvent;
  }

  async findAll(user_id: string): Promise<Event[]> {
    const allEvents = await this.eventsRepository.find({ where: { user_id } });

    return allEvents;
  }

  async findByName({ filterBy, user_id }: IEventFind): Promise<Event> {
    const foundEvent = await this.eventsRepository.findOne({
      where: { name: filterBy, user_id },
    });

    return foundEvent;
  }

  async create({
    name,
    description,
    date,
    user_id,
    tags,
  }: IEventCreate): Promise<Event> {
    const eventToSave = this.eventsRepository.create({
      name,
      description,
      date,
      user_id,
      tags,
    });

    await this.eventsRepository.save(eventToSave);

    return eventToSave;
  }

  async update(
    event_id: string,
    { name, description, date }: Omit<Partial<IEventCreate>, 'user_id'>
  ): Promise<Event> {
    const foundEvent = await this.eventsRepository.findOne(event_id);

    const updatedEvent = {} as Event;

    Object.assign(updatedEvent, foundEvent, { name, description, date });

    await this.eventsRepository.save(updatedEvent);

    return updatedEvent;
  }

  async delete(event_id: string): Promise<boolean> {
    const deletedEvent = await this.eventsRepository.delete(event_id);

    return !!deletedEvent;
  }
}

export { EventsRepository };
