import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IItemSchema } from '../item.schema.interface'

export type ItemDocument = Item & mongoose.Document

@Schema({ collection: 'items', autoIndex: true, timestamps: true })
export class Item implements IItemSchema {
    @Prop({ required: true, index: { unique: true } })
    uuid: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    quantity: number;

    @Prop({ required: true })
    cost: number;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);