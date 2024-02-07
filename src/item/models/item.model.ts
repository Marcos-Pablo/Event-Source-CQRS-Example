import { AggregateRoot } from "@nestjs/cqrs";
import { ItemCreatedEvent } from "@item/events/item-created.event";
import { ItemDeletedEvent } from "@item/events/item-deleted.event";
import { ItemUpdatedEvent } from "@item/events/item-updated.event";
import { SnapshotEvent } from "@item/events/snapshot.event";

export class Item extends AggregateRoot {
    uuid: string;
    name: string;
    quantity: number;
    cost: number;
    deletedAt: Date | null

    public constructor() {
        super();
    }

    getName(): string {
        return this.name;
    }

    create() {
        const event = new ItemCreatedEvent(this.uuid, this.name, this.quantity, this.cost, null);

        this.apply(event);

        return event;
    }

    onItemCreatedEvent(event: ItemCreatedEvent) {
        this.uuid = event.uuid;
        this.name = event.name;
        this.cost = event.cost;
        this.quantity = event.quantity;
        this.deletedAt = null;
    }

    update() {
        const event = new ItemUpdatedEvent(this.uuid, this.name, this.quantity, this.cost)

        this.apply(event);

        return event;
    }

    onItemUpdatedEvent(event: ItemUpdatedEvent) {
        this.name = event.name;
        this.cost = event.cost;
        this.quantity = event.quantity;
    }

    delete() {
        const event = new ItemDeletedEvent(this.uuid, this.deletedAt);

        this.apply(event);

        return event;
    }

    onItemDeletedEvent(event: ItemDeletedEvent) {
        this.deletedAt = event.deletedAt;
    }

    onSnapshotEvent(event: SnapshotEvent) {
        this.uuid = event.uuid;
        this.name = event.name;
        this.cost = event.cost;
        this.quantity = event.quantity;
        this.deletedAt = event.deletedAt;
    }
}