import { IEventCreate } from '../dtos/IEventCreate';
import { IEventFind } from '../dtos/IEventFind';
import { Event } from '../infra/typeorm/entities/Event';

export interface IEventsRepository {
  create(eventInput: IEventCreate): Promise<Event>;
  findByName(findEventInput: IEventFind): Promise<Event | null>;
  findById(event_id: string): Promise<Event | null>;
  findAll(user_id: string): Promise<Event[]>;
  delete(event_id: string): Promise<boolean>;
  update(
    event_id: string,
    eventInput: Omit<Partial<IEventCreate>, 'user_id'>
  ): Promise<Event>;
}
