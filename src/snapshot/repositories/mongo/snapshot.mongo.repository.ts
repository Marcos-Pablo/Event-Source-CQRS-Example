import { Injectable } from "@nestjs/common";
import { IEvent } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { plainToInstance } from "class-transformer";
import mongoose from "mongoose";
import { EventFactory } from "src/commons/factories/event-factory";
import { Snapshot } from "src/snapshot/models/snapshot.model";
import { SnapshotRepository } from "../snapshot.repository";
import { ISnapshotSchema } from "../snapshot.schema.interface";
import { Snapshot as Schema, SnapshotDocument } from "./snapshot.schema";

@Injectable()
export class SnapshotMongoRepository extends SnapshotRepository {
    
    constructor(
        @InjectModel(Schema.name) private model: mongoose.Model<SnapshotDocument>,
        private eventFactory: EventFactory
    ) 
    {
        super();
    }

    async create(event: Snapshot): Promise<void> {
        await this.model.create(event);
    }

    async findLastSnapshotByAggregateId(uuid: string): Promise<ISnapshotSchema> {
        return await this.model.findOne({ aggregateId: uuid }, {}, { sort: { 'createdAt' : -1 }});
    }

    async loadLastSnapshotEvent(uuid: string): Promise<IEvent> {
        const event = await this.findLastSnapshotByAggregateId(uuid);

        if(event) {
            const eventType = this.eventFactory.getEventType(event.eventName);
            const deserializedEvent = plainToInstance(<any>eventType, event.eventData)
            
            return deserializedEvent;
        }

        return null;
    }
}