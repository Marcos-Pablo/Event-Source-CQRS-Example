import { Injectable } from '@nestjs/common';
import { IItemSchema as Schema } from '@item/repositories/item.schema.interface';
import { ItemRequestDto } from '@item/Controllers/Dtos/item.request';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateItemCommand } from '@item/Commands/create-item.command';
import { UpdateItemCommand } from '@item/Commands/update-item.command';
import { DeleteItemCommand } from '@item/Commands/delete-item.command';
import { FindAllItemsQuery } from '@item/Queries/findall-items.query';
import { FindItemQuery } from '@item/Queries/find-item.query';

@Injectable()
export class ItemService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  FindAll(): Promise<Schema[]> {
    return this.queryBus.execute(new FindAllItemsQuery());
  }

  async FindByIdAsync(id: string): Promise<Schema> {
    return this.queryBus.execute(new FindItemQuery(id));
  }

  async Create(itemRequestDto: ItemRequestDto): Promise<void> {
    return this.commandBus.execute(
      new CreateItemCommand(
        itemRequestDto.name,
        itemRequestDto.cost,
        itemRequestDto.quantity,
      ),
    );
  }

  async DeleteById(id: string): Promise<void> {
    return this.commandBus.execute(new DeleteItemCommand(id));
  }

  async Update(id: string, updateItemDto: ItemRequestDto): Promise<void> {
    return this.commandBus.execute(
      new UpdateItemCommand(
        id,
        updateItemDto.name,
        updateItemDto.cost,
        updateItemDto.quantity,
      ),
    );
  }
}
