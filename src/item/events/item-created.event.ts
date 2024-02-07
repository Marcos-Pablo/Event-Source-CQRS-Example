import { IEvent } from '@nestjs/cqrs';

export class ItemCreatedEvent implements IEvent {
    constructor(
        public readonly uuid: string,
        public readonly name: string,
        public readonly quantity: number,
        public readonly cost: number,
        public readonly deletedAt: null,
    ) {}
}
