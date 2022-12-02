import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Item } from '@item/models/item.model';
import { UpdateItemCommand } from '@item/Commands/update-item.command';
import { EventRepository } from '@event/repositories/event.repository';
import { Event } from '@event/models/event.model';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@nestjs/common';
import { SnapshotRepository } from '@snapshot/repositories/snapshot.repository';

@CommandHandler(UpdateItemCommand)
export class UpdateItemHandler implements ICommandHandler<UpdateItemCommand> {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly publisher: EventPublisher,
    private readonly snapshotRepository: SnapshotRepository,
  ) {}

  async execute(command: UpdateItemCommand): Promise<void> {
    const events = await this.eventRepository.loadEvents(command.uuid);

    const item = this.publisher.mergeObjectContext(new Item());
    item.loadFromHistory(events);

    if (item.deletedAt == null) {
      item.name = command.name;
      item.quantity = command.quantity;
      item.cost = command.cost;
      const event = item.update();

      this.eventRepository.create(
        new Event(uuidv4(), item.uuid, 'ItemUpdatedEvent', event),
      );

      item.commit();

      return;
    }

    throw new NotFoundException();
  }
}
