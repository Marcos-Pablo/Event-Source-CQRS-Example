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
        const x = new Item();
        x.uuid = uuidv4();
        x.name = command.name;
        x.quantity = command.quantity;
        x.cost = command.cost;

        const item = this.publisher.mergeObjectContext(x);

        const event = item.create();

        this.repository.create(
            new Event(uuidv4(), item.uuid, 'ItemCreatedEvent', event),
        );

        item.commit();
    }
}
