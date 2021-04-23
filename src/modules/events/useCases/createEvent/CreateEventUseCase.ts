import { inject, injectable } from 'tsyringe';

import { Event } from '@modules/events/infra/typeorm/entities/Event';
import { IEventsRepository } from '@modules/events/interfaces/IEventsRepository';
import { Tag } from '@modules/tags/infra/typeorm/entities/Tag';
import { ITagsRepository } from '@modules/tags/interfaces/ITagsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  date: Date;
  user_id: string;
  tags_name: string[];
}
@injectable()
class CreateEventUseCase {
  constructor(
    @inject('EventsRepository') private eventsRepository: IEventsRepository,
    @inject('TagsRepository') private tagsRepository: ITagsRepository
  ) {}

  async execute({
    name,
    description,
    date,
    user_id,
    tags_name,
  }: IRequest): Promise<Event> {
    const eventAlreadyExists = await this.eventsRepository.findByName({
      filterBy: name,
      user_id,
    });

    if (eventAlreadyExists) throw new AppError('Event already exists');

    const tagsExists = await this.tagsRepository.findByNames(
      user_id,
      tags_name
    );

    const tagsNamesExists = tagsExists.map(({ name }) => name);

    const tagsNamesThatDontExists = tags_name.filter(
      tag_name => !tagsNamesExists.includes(tag_name)
    );

    const newTags: Tag[] = [];

    const DEFAULT_COLOR_HEX = '#7159c1';

    await Promise.all(
      tagsNamesThatDontExists.map(async tag_name => {
        const newTag = await this.tagsRepository.create({
          name: tag_name,
          colorHex: DEFAULT_COLOR_HEX,
          user_id,
        });

        newTags.push(newTag);
      })
    );

    const tagsThatWillBeInsert = [...tagsExists, ...newTags];

    const createdEvent = await this.eventsRepository.create({
      name,
      description,
      date: new Date(date),
      user_id,
      tags: tagsThatWillBeInsert,
    });

    return createdEvent;
  }
}

export { CreateEventUseCase };
