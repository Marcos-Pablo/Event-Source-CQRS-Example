import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Item as Model } from "src/item/models/item.model";
import { Repository } from "../repository.interface"
import { Item as Schema, ItemDocument } from "./item.schema";

@Injectable()
export class MongoRepository extends Repository {

    constructor(@InjectModel(Schema.name) private model: mongoose.Model<ItemDocument>) {
        super();
    }

    create(item: Model): Promise<void> {
        const createdItem = new this.model(item);
        createdItem.save();
        return;
    }
    async updateById(id: string, updatedItem: Model): Promise<void> {
        const item = await this.model.findOne({ uuid: id });

        if (!item)
            throw new NotFoundException();

        await this.model.updateOne({ uuid: id }, updatedItem)
    }
    async findAll(): Promise<Schema[]> {
        return await this.model.find().exec();
    }
    async findById(id: string): Promise<Schema> {
        const item = await this.model.findOne({ uuid: id });

        if (!item)
            throw new NotFoundException();

        return item;
    }
    async deleteById(id: string): Promise<void> {
        const item = await this.model.findOne({ uuid: id });

        if (!item)
            throw new NotFoundException();

        await this.model.deleteOne({ uuid: id });
    }

}