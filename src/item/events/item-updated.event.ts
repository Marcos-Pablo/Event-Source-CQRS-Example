import { IEvent } from "@nestjs/cqrs";

export class ItemUpdatedEvent implements IEvent {
    constructor(
        public readonly uuid: string,
        public readonly name: string,
        public readonly quantity: number,
        public readonly cost: number,

    ) { }
}