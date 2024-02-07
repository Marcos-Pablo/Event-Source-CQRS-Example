import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { EventRepository } from "@event/repositories/event.repository";
import { Item } from "@item/models/item.model";
import { DeleteItemCommand } from "@item/Commands/delete-item.command";
import { v4 as uuidv4 } from 'uuid';
import { Event } from "@event/models/event.model";
import { NotFoundException } from "@nestjs/common";
import { SnapshotRepository } from "@snapshot/repositories/snapshot.repository";

@CommandHandler(DeleteItemCommand)
export class DeleteItemHandler implements ICommandHandler<DeleteItemCommand> {
    constructor(
        private readonly eventRepository: EventRepository,
        private readonly publisher: EventPublisher,
        private readonly snapshotRepository: SnapshotRepository
    ) { }

    async execute(command: DeleteItemCommand): Promise<void> {
        const events = await this.eventRepository.loadEvents(command.uuid)

        const snapshot = await this.snapshotRepository.loadLastSnapshotEvent(command.uuid);

        if (snapshot) {
            events.splice(1, 0, snapshot);
        }

        const item = this.publisher.mergeObjectContext(new Item());
        item.loadFromHistory(events)

        if (item.deletedAt == null) {
            item.deletedAt = new Date();
            const event = item.delete();

            this.eventRepository.create(new Event(uuidv4(), item.uuid, 'ItemDeletedEvent', event))

            item.commit();
        }

        throw new NotFoundException();
    }
}