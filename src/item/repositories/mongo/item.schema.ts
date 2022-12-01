import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IItemSchema } from '@item/repositories/item.schema.interface'

export type ItemDocument = Item & mongoose.Document

@Schema({ collection: 'items', autoIndex: true, timestamps: true })
export class Item implements IItemSchema {
    @Prop({ required: true, index: { unique: true } })
    uuid: string;

    @Prop()
    name: string;

    @Prop()
    quantity: number;

    @Prop()
    cost: number;

    @Prop()
    deletedAt: Date | null;
}

export const ItemSchema = SchemaFactory.createForClass(Item);