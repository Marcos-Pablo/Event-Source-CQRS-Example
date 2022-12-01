import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Repository } from "@item/repositories/repository.interface";
import { MongoToken } from "@item/repositories/mongo/mongo.repository";
import { ItemDeletedEvent } from "@item/events/item-deleted.event";
import { EventService } from "@event/services/event.service";

@EventsHandler(ItemDeletedEvent)
export class ItemUpdatedEventHandler implements IEventHandler<ItemDeletedEvent> {
    constructor(@Inject(MongoToken) private readonly repository: Repository,
        private readonly eventService: EventService) { }

    handle(event: ItemDeletedEvent) {
        this.eventService.snapshotHandle(event.uuid);
    }
}