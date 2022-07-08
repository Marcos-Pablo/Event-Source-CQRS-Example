import { Model, Query } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from '../schemas/item.schema';
import { CreateItemDto } from '../Dtos/create-item.dto'
import { UpdateItemDto } from 'src/Dtos/update-item.dto';

@Injectable()
export class ItemService {

    constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) { }

    FindAll(): Promise<Item[]> {
        return this.itemModel.find().exec();
    }

    Create(createItemDto: CreateItemDto): Promise<Item> {
        const createdItem = new this.itemModel(createItemDto);
        return createdItem.save();
    }

    async FindByIdAsync(id: string): Promise<Item> {
        const item = await this.itemModel.findById(id);
        
        return item;
    }

    async DeleteById(id: string) {
        await this.itemModel.findByIdAndDelete(id);
    }

    async Update(id: string, updateItemDto: UpdateItemDto) {
        await this.itemModel.updateOne({ _id: id }, updateItemDto)
    }
}