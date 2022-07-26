import { Injectable, NotFoundException } from '@nestjs/common';
// import { Item as Schema, ItemDocument } from '../repositories/mongo/item.schema';
// import { Item as Schema } from '../repositories/mysql/item.schema';
import { IItemSchema as Schema } from '../repositories/item.schema.interface';
import { Repository } from '../repositories/repository.interface';
import { Item as Model } from '../models/item.model';
import { ItemRequestDto } from '../Controllers/Dtos/item.request';
import { CommandBus } from '@nestjs/cqrs';
import { CreateItemCommand } from '../Commands/create-item.command';
import { UpdateItemCommand } from '../Commands/update-item.command';
import { DeleteItemCommand } from '../Commands/delete-item.command';

@Injectable()
export class ItemService {

    constructor(private commandBus: CommandBus) { }

    async Create(itemRequestDto: ItemRequestDto): Promise<void> {
        return this.commandBus.execute(
            new CreateItemCommand(itemRequestDto.name, itemRequestDto.cost, itemRequestDto.quantity)
        );
    }

    async DeleteById(id: string): Promise<void> {
        return this.commandBus.execute(
            new DeleteItemCommand(id)
        );
    }

    async Update(id: string, updateItemDto: ItemRequestDto): Promise<void> {

        return this.commandBus.execute(
            new UpdateItemCommand(id, updateItemDto.name, updateItemDto.cost, updateItemDto.quantity)
        );
    }
}