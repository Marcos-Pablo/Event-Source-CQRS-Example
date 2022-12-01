import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { ISnapshotSchema } from "@snapshot/repositories/snapshot.schema.interface";

export type SnapshotDocument = Snapshot & mongoose.Document

@Schema({ collection: 'snapshots', autoIndex: true, timestamps: true })
export class Snapshot implements ISnapshotSchema {

    @Prop({ required: true, index: { unique: true } })
    uuid: string;

    @Prop({ required: true })
    aggregateId: string;
    
    @Prop({ required: true })
    eventName: string;

    @Prop({ required: true, type: mongoose.Types.Map })
    eventData: any;
}

export const SnapshotSchema = SchemaFactory.createForClass(Snapshot);