import { IEvent } from '@nestjs/cqrs';
import { IEventBase } from '@commons/interfaces/event-base.interface';
import { Snapshot as Model } from '@snapshot/models/snapshot.model';

export abstract class SnapshotRepository {
    abstract create(event: Model): Promise<void>;
    abstract findLastSnapshotByAggregateId(uuid: string): Promise<IEventBase>;
    abstract loadLastSnapshotEvent(uuid: string): Promise<IEvent>;
}
