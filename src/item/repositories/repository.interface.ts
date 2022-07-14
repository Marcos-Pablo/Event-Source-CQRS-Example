import { Item as Model } from "../models/item.model";
import { Item as Schema } from "./mongo/item.schema"

export abstract class Repository {
    abstract create(item: Model): Promise<void>;
    abstract updateById(id: string, item: Model): Promise<void>;
    abstract findAll(): Promise<Schema[]>;
    abstract findById(id: string): Promise<Schema>;
    abstract deleteById(id: string): Promise<void>;
}