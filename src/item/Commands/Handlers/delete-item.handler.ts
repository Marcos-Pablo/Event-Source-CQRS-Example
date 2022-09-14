import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { EventRepository } from "src/event/repositories/event.repository";
import { Item } from "src/item/models/item.model";
import { DeleteItemCommand } from "../delete-item.command";
import { v4 as uuidv4 } from 'uuid';
import { Event } from "src/event/models/event.model";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteItemCommand)
export class DeleteItemHandler implements ICommandHandler<DeleteItemCommand> {
    constructor(
        private readonly eventRepository: EventRepository,
        private readonly publisher: EventPublisher
    ) { }

    async execute(command: DeleteItemCommand): Promise<void> {
        const events = await this.eventRepository.loadEvents(command.uuid)

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