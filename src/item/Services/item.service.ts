import { Injectable, NotFoundException } from '@nestjs/common';
import { Item as Schema, ItemDocument } from '../repositories/mongo/item.schema';
// import { Item as Schema } from '../repositories/mysql/item.schema';
import { Repository } from '../repositories/repository.interface';
import { Item as Model } from '../models/item.model';

@Injectable()
export class ItemService {

    constructor(private readonly repository: Repository) { }

    FindAll(): Promise<Schema[]> {
        return this.repository.findAll();
    }

    async Create(itemRequestDto: Model): Promise<void> {
        this.repository.create(itemRequestDto);
    }

    async FindByIdAsync(id: string): Promise<Schema> {
        return this.repository.findById(id);
    }

    async DeleteById(id: string): Promise<void> {
        return this.repository.deleteById(id);
    }

    async Update(id: string, updateItemDto: Model) {
        return this.repository.updateById(id, updateItemDto)
    }
}