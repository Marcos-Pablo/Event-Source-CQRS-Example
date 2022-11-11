import { Inject } from "@nestjs/common";
import { EventPublisher, EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ItemUpdatedEvent } from "../item-updated.event";
import { Repository } from "src/item/repositories/repository.interface";
import { Item } from "../../models/item.model";
import { MysqlToken } from "src/item/repositories/mysql/mysql.repository";
import { EventRepository } from "src/event/repositories/event.repository";
import { SnapshotRepository } from "src/snapshot/repositories/snapshot.repository";
import { Snapshot } from "src/snapshot/models/snapshot.model";
import { v4 as uuidv4 } from 'uuid';
import { plainToInstance } from 'class-transformer';
import { EventFactory } from "src/event/factories/event-factory";

@EventsHandler(ItemUpdatedEvent)
export class ItemUpdatedEventHandler implements IEventHandler<ItemUpdatedEvent> {
    constructor(
        @Inject(MysqlToken) private readonly repository: Repository, 
        private readonly eventRepository: EventRepository,
        private readonly snapshotRepository: SnapshotRepository,
        private readonly publisher: EventPublisher,
        private eventFactory: EventFactory) { }

    async handle(event: ItemUpdatedEvent) {
        const item = new Item();
        item.uuid = event.uuid;
        item.name = event.name;
        item.cost = event.cost;
        item.quantity = event.quantity;

        this.repository.updateById(item.uuid, item);

        const events = await this.eventRepository.findByAggregateIdAndEventName(event.uuid, 'ItemUpdatedEvent');

        if(events.length >= 5) {
            const uuids = events.map(event => event.uuid);

            await this.eventRepository.markAsSnapshot(uuids);

            const deserializedEvents = events.map(event => {
                const eventType = this.eventFactory.getEventType(event.eventName);
                return plainToInstance(<any>eventType, event.eventData)
            })

            const loadedItem = this.publisher.mergeObjectContext(new Item());
            loadedItem.loadFromHistory(deserializedEvents)

            const event = new ItemUpdatedEvent(item.uuid, loadedItem.name, loadedItem.quantity, loadedItem.cost)

            this.snapshotRepository.create(new Snapshot(uuidv4(), item.uuid, 'ItemUpdatedEvent', event))
        }
    }
}