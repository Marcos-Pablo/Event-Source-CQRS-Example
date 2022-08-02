import { AggregateRoot } from "@nestjs/cqrs";
import { ExportItemCreatedEvent } from "../events/export-item-created.event";

export class Item extends AggregateRoot {
    uuid: string;
    name: string;
    quantity: number;
    cost: number;

    public constructor(init?: Partial<Item>) {
        super();
        Object.assign(this, init);
    }

    create() {
        this.apply(new ExportItemCreatedEvent(this.uuid, this.name, this.quantity, this.cost))
    }
}