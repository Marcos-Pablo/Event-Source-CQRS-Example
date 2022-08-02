import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Event } from "src/event/models/event.model";
import { EventRepository } from "../event.repository";
import { Event as Schema, EventDocument } from "./event.schema";

@Injectable()
export class EventMongoRepository extends EventRepository {
    constructor(@InjectModel(Schema.name) private model: mongoose.Model<EventDocument>) {
        super();
    }

    async create(event: Event): Promise<void> {
        await this.model.create(event);
    }
}