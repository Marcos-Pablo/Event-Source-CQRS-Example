import { IEvent } from "@nestjs/cqrs";
import { IEventBase } from "src/commons/interfaces/event-base.interface";
import { Snapshot as Model } from "../models/snapshot.model";
import { ISnapshotSchema as Schema } from "./snapshot.schema.interface";

export abstract class SnapshotRepository {
    abstract create(event: Model): Promise<void>;
    abstract findLastSnapshotByAggregateId(uuid: string): Promise<IEventBase>;
    abstract loadLastSnapshotEvent(uuid: string): Promise<IEvent>;
}