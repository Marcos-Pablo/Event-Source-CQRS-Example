import { IEvent } from "@nestjs/cqrs";
import { IEventBase } from "src/commons/interfaces/event-base.interface";
import { Event as Model } from "../models/event.model";
import { IEventSchema as Schema } from "./event.schema.interface";

export abstract class EventRepository {
    abstract create(event: Model): Promise<void>;
    abstract findByAggregateId(uuid: string): Promise<IEventBase[]>;
    abstract loadEvents(uuid: string): Promise<IEvent[]>;
    abstract markAsSnapshot(uuids: string[]): Promise<void>;
}