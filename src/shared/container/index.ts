import { container } from 'tsyringe';

import '@modules/users/providers';

import { EventsRepository } from '@modules/events/infra/typeorm/repositories/EventsRepository';
import { IEventsRepository } from '@modules/events/interfaces/IEventsRepository';
import { TagsRepository } from '@modules/tags/infra/typeorm/repositories/TagsRepository';
import { ITagsRepository } from '@modules/tags/interfaces/ITagsRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/interfaces/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository
);
