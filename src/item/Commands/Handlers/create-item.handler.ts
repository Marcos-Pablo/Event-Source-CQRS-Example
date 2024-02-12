import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Item } from '@item/models/item.model';
import { EventRepository } from '@event/repositories/event.repository';
import { CreateItemCommand } from '@item/Commands/create-item.command';
import { v4 as uuidv4 } from 'uuid';
import { Event } from '@event/models/event.model';

@CommandHandler(CreateItemCommand)
export class CreateItemHandler implements ICommandHandler<CreateItemCommand> {
    constructor(
        private readonly repository: EventRepository,
        private readonly publisher: EventPublisher,
    ) {}

    async execute(command: CreateItemCommand): Promise<void> {
        var item = new Item();
        item.uuid = uuidv4();
        item.name = command.name;
        item.quantity = command.quantity;
        item.cost = command.cost;

        item = this.publisher.mergeObjectContext(item);

        const event = item.create();

        this.repository.create(
            new Event(uuidv4(), item.uuid, 'ItemCreatedEvent', event),
        );

        item.commit();
    }
}
