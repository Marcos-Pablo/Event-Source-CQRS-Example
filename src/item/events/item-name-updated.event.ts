import { IEvent } from "@nestjs/cqrs";

export class ItemNameUpdatedEvent implements IEvent {
    constructor(
        public readonly uuid: string,
        public readonly name: string
    )
    {}
}