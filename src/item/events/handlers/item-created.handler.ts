import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ItemCreatedEvent } from "../item-created.event";
import { Repository } from "src/item/repositories/repository.interface";
import { Item } from "../../models/item.model";
import { MongoToken } from "src/item/repositories/mongo/mongo.repository";

@EventsHandler(ItemCreatedEvent)
export class ItemCreatedEventHandler implements IEventHandler<ItemCreatedEvent> {
    constructor(@Inject(MongoToken) private readonly repository: Repository) { }

    handle(event: ItemCreatedEvent) {
        
    }
}