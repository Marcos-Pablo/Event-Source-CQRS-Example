import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Item } from "src/item/models/item.model";
import { UpdateItemCommand } from "../update-item.command";
import { EventRepository } from "src/event/repositories/event.repository";
import { Event } from "src/event/models/event.model";
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateItemCommand)
export class UpdateItemHandler implements ICommandHandler<UpdateItemCommand> {
    constructor(
        private readonly eventRepository: EventRepository,
        private readonly publisher: EventPublisher) { }

    async execute(command: UpdateItemCommand): Promise<void> {
        const events = await this.eventRepository.loadEvents(command.uuid)

        const item = this.publisher.mergeObjectContext(new Item());
        item.loadFromHistory(events)

        if (item.deletedAt == null) {
            item.name = command.name;
            item.quantity = command.quantity;
            item.cost = command.cost;
            const event = item.update();

            this.eventRepository.create(new Event(uuidv4(), item.uuid, 'ItemUpdatedEvent', event))

            item.commit();
        }

        throw new NotFoundException();
    }

}