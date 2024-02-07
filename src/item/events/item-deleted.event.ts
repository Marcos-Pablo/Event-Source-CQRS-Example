import { IEvent } from '@nestjs/cqrs';

export class ItemDeletedEvent implements IEvent {
    constructor(
        public readonly uuid: string,
        public readonly deletedAt: Date,
    ) {}
}
