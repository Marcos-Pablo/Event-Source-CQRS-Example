import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ItemUpdatedEvent } from "../item-updated.event";
import { Repository } from "src/item/repositories/repository.interface";
import { Item } from "../../models/item.model";
import { MysqlToken } from "src/item/repositories/mysql/mysql.repository";

@EventsHandler(ItemUpdatedEvent)
export class ItemUpdatedEventHandler implements IEventHandler<ItemUpdatedEvent> {
    constructor(@Inject(MysqlToken) private readonly repository: Repository) { }

    async handle(event: ItemUpdatedEvent) {
        const itemSchema = await this.repository.findById(event.uuid);

        const item = new Item();
        item.uuid = event.uuid;
        item.name = event.name;
        item.cost = event.cost;
        item.quantity = event.quantity;

        this.repository.updateById(item.uuid, item);
    }
}