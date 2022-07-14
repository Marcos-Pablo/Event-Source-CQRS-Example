import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ItemDocument = Item & mongoose.Document

@Schema({ collection: 'items', autoIndex: true, timestamps: true})
export class Item {
    @Prop({ required: true, index: { unique: true}})
    uuid: string;

    @Prop({ required: true})
    name: string;

    @Prop()
    quantity: number;

    @Prop({ required: true})
    cost: number;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);