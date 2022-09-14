import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ItemUpdatedEvent } from "../item-updated.event";
import { Repository } from "src/item/repositories/repository.interface";
import { Item } from "../../models/item.model";
import { MongoToken } from "src/item/repositories/mongo/mongo.repository";

@EventsHandler(ItemUpdatedEvent)
export class ItemUpdatedEventHandler implements IEventHandler<ItemUpdatedEvent> {
    constructor(@Inject(MongoToken) private readonly repository: Repository) { }

    handle(event: ItemUpdatedEvent) {
        console.log('teste');
    }
}