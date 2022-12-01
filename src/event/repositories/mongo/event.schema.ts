import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { IEventSchema } from "@event/repositories/event.schema.interface";

export type EventDocument = Event & mongoose.Document

@Schema({ collection: 'events', autoIndex: true, timestamps: true })
export class Event implements IEventSchema {

    @Prop({ required: true, index: { unique: true } })
    uuid: string;

    @Prop({ required: true })
    aggregateId: string;

    @Prop({ required: true })
    eventName: string;

    @Prop({ default: false })
    snapshot: boolean;

    @Prop({ required: true, type: mongoose.Types.Map })
    eventData: any;
}

export const EventSchema = SchemaFactory.createForClass(Event);