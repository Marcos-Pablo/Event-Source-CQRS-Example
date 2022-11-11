import { IEvent } from "@nestjs/cqrs";
import { Event as Model } from "../models/event.model";
import { IEventSchema as Schema } from "./event.schema.interface";

export abstract class EventRepository {
    abstract create(event: Model): Promise<void>;
    abstract findByAggregateId(uuid: string): Promise<Schema[]>;
    abstract findByAggregateIdAndEventName(uuid: string, eventName: string): Promise<Schema[]>;
    abstract loadEvents(uuid: string): Promise<IEvent[]>;
    abstract markAsSnapshot(uuids: string[]): Promise<void>;
}