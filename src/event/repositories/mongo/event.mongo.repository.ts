import { Injectable } from "@nestjs/common";
import { IEvent } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Event } from "src/event/models/event.model";
import { EventRepository } from "../event.repository";
import { IEventSchema } from "../event.schema.interface";
import { Event as Schema, EventDocument } from "./event.schema";
import { plainToInstance } from 'class-transformer';
import { EventFactory } from "src/event/factories/event-factory";
import { SnapshotRepository } from "src/snapshot/repositories/snapshot.repository";

@Injectable()
export class EventMongoRepository extends EventRepository {
    constructor(@InjectModel(Schema.name) private model: mongoose.Model<EventDocument>,
        private eventFactory: EventFactory,
        private readonly snapshotRepository: SnapshotRepository) {
        super();
    }

    async create(event: Event): Promise<void> {
        await this.model.create(event);
    }

    async findByAggregateId(uuid: string): Promise<IEventSchema[]> {
        return await this.model.find({ aggregateId: uuid, snapshot: false });
    }

    async findByAggregateIdAndEventName(uuid: string, eventName: string): Promise<IEventSchema[]> {
        return await this.model.find({ aggregateId: uuid, snapshot: false, eventName: eventName });
    }

    async markAsSnapshot(uuids: string[]): Promise<void> {
        await this.model.updateMany({ uuid: { $in: uuids } }, { "$set": { snapshot: true } });

        return;
    }

    async loadEvents(uuid: string): Promise<IEvent[]> {
        const events = await this.findByAggregateId(uuid);

        const snapshot = await this.snapshotRepository.loadLastSnapshotEvent(uuid);

        if (snapshot) {
            events.splice(1, 0, snapshot);
        }

        const deserializedEvents = events.map(event => {
            const eventType = this.eventFactory.getEventType(event.eventName);
            return plainToInstance(<any>eventType, event.eventData)
        });



        return deserializedEvents;
    }
}