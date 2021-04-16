import { IEventCreate } from '../dtos/IEventCreate';
import { IEventFind } from '../dtos/IEventFind';
import { Event } from '../infra/typeorm/entities/Event';

export interface IEventsRepository {
  create(eventInput: IEventCreate): Promise<Event>;
  findByName(findEventInput: IEventFind): Promise<Event | null>;
  findAll(user_id: string): Promise<Event[]>;
}
