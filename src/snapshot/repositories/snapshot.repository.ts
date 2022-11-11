import { IEvent } from "@nestjs/cqrs";
import { Snapshot as Model } from "../models/snapshot.model";
import { ISnapshotSchema as Schema } from "./snapshot.schema.interface";

export abstract class SnapshotRepository {
    abstract create(event: Model): Promise<void>;
    abstract findLastSnapshotByAggregateId(uuid: string): Promise<Schema>;
    abstract loadLastSnapshotEvent(uuid: string): Promise<IEvent>;
}