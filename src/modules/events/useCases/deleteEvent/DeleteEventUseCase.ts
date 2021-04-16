import { inject, injectable } from 'tsyringe';

import { IEventsRepository } from '@modules/events/interfaces/IEventsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteEventUseCase {
  constructor(
    @inject('EventsRepository') private eventsRepository: IEventsRepository
  ) {}

  async execute(event_id: string): Promise<void> {
    const eventDoesntExists = await this.eventsRepository.findById(event_id);

    if (!eventDoesntExists) throw new AppError('Event doesnt exists', 404);

    await this.eventsRepository.delete(event_id);
  }
}
export { DeleteEventUseCase };
