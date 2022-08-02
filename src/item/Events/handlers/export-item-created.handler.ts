import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { MysqlToken } from "../../repositories/mysql/mysql.repository";
import { ExportItemCreatedEvent } from "../export-item-created.event";
import { Repository } from "src/item/repositories/repository.interface";
import { Item } from "../../models/item.model";

@EventsHandler(ExportItemCreatedEvent)
export class ExportItemCreatedHandler implements IEventHandler<ExportItemCreatedEvent> {
    constructor(@Inject(MysqlToken) private readonly repository: Repository) {}

    handle(event: ExportItemCreatedEvent) {
        const item = new Item({
            uuid: event.uuid,
            name: event.name,
            cost: event.cost,
            quantity: event.quantity
        })

        this.repository.create(item);
    }
}