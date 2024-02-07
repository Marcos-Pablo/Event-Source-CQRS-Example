import { EventRepository } from '@event/repositories/event.repository';
import { plainToInstance } from 'class-transformer';
import { EventPublisher } from '@nestjs/cqrs';
import { Item } from '@item/models/item.model';
import { Injectable } from '@nestjs/common';
import { SnapshotRepository } from '@snapshot/repositories/snapshot.repository';
import { Snapshot } from '@snapshot/models/snapshot.model';
import { v4 as uuidv4 } from 'uuid';
import { SnapshotEvent } from '@item/events/snapshot.event';
import { EventFactory } from '@commons/factories/event-factory';

@Injectable()
export class EventService {
    constructor(
        private eventFactory: EventFactory,
        private readonly publisher: EventPublisher,
        private readonly snapshotRepository: SnapshotRepository,
        private readonly eventRepository: EventRepository,
    ) {}

    async snapshotHandle(aggregateId: string) {
        const events = await this.eventRepository.findByAggregateId(
            aggregateId,
        );

        if (events.length >= 5) {
            const uuids = events.map((event) => event.uuid);

            await this.eventRepository.markAsSnapshot(uuids);

            const deserializedEvents = events.map((event) => {
                const eventType = this.eventFactory.getEventType(
                    event.eventName,
                );
                return plainToInstance(<any>eventType, event.eventData);
            });

            const loadedItem = this.publisher.mergeObjectContext(new Item());
            loadedItem.loadFromHistory(deserializedEvents);

            const event = new SnapshotEvent(
                aggregateId,
                loadedItem.name,
                loadedItem.quantity,
                loadedItem.cost,
                loadedItem.deletedAt,
            );

            this.snapshotRepository.create(
                new Snapshot(uuidv4(), aggregateId, 'Snapshot', event),
            );
        }
    }
}
