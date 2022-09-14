import { Injectable } from "@nestjs/common";
import { IEvent } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Event } from "src/event/models/event.model";
import { EventRepository } from "../event.repository";
import { IEventSchema } from "../event.schema.interface";
import { Event as Schema, EventDocument } from "./event.schema";
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ItemCreatedEvent } from "src/item/events/item-created.event";
import { EventFactory } from "src/event/factories/event-factory";

@Injectable()
export class EventMongoRepository extends EventRepository {
    constructor(@InjectModel(Schema.name) private model: mongoose.Model<EventDocument>,
        private eventFactory: EventFactory) 
    {
        super();
    }

    async create(event: Event): Promise<void> {
        await this.model.create(event);
    }

    async findByAggregateId(uuid: string): Promise<IEventSchema[]> {
        return await this.model.find({ aggregateId: uuid });
    }

    async loadEvents(uuid: string): Promise<IEvent[]> {
        const events = await this.findByAggregateId(uuid);

        const deserializedEvents = events.map(event => {
            const eventType = this.eventFactory.getEventType(event.eventName);
            return plainToInstance(<any>eventType, event.eventData)
        })

        return deserializedEvents;
    }

}