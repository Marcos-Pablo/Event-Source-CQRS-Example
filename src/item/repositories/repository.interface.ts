import { Item as Model } from '@item/models/item.model';
import { IItemSchema as Schema } from '@item/repositories/item.schema.interface';

export abstract class Repository {
  abstract create(item: Model): Promise<void>;
  abstract updateById(uuid: string, updatedItem: Model): Promise<void>;
  abstract findAll(): Promise<Schema[]>;
  abstract findById(uuid: string): Promise<Schema>;
  abstract deleteById(uuid: string): Promise<void>;
}
