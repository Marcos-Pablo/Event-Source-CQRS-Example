import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ItemUpdatedEvent } from "../item-updated.event";
import { Repository } from "src/item/repositories/repository.interface";
import { Item } from "../../models/item.model";
import { MysqlToken } from "src/item/repositories/mysql/mysql.repository";
import { SnapshotService } from "src/snapshot/services/snapshot.service";

@EventsHandler(ItemUpdatedEvent)
export class ItemUpdatedEventHandler implements IEventHandler<ItemUpdatedEvent> {
    constructor(
        @Inject(MysqlToken) private readonly repository: Repository,
        private readonly snapshotService: SnapshotService) { }

    async handle(event: ItemUpdatedEvent) {
        const item = new Item();
        item.uuid = event.uuid;
        item.name = event.name;
        item.cost = event.cost;
        item.quantity = event.quantity;

        this.repository.updateById(item.uuid, item);

        this.snapshotService.snapshotHandle(event.uuid);
    }
}