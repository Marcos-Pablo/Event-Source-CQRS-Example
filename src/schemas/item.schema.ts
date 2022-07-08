import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document

@Schema()
export class Item {
    @Prop()
    name: string;

    @Prop()
    quantity: number;

    @Prop()
    cost: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);