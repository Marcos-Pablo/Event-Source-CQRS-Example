import { Item as Model } from "../models/item.model";
import { IItemSchema as Schema } from "./item.schema.interface";
// import { Item as Schema } from "./mysql/item.schema"

export abstract class Repository {
    abstract create(item: Model): Promise<void>;
    abstract updateById(uuid: string, updatedItem: Model): Promise<void>;
    abstract findAll(): Promise<Schema[]>;
    abstract findById(uuid: string): Promise<Schema>;
    abstract deleteById(uuid: string): Promise<void>;
}