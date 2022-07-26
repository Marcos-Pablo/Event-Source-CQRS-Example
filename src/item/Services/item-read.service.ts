import { Injectable, NotFoundException } from '@nestjs/common';
// import { Item as Schema, ItemDocument } from '../repositories/mongo/item.schema';
// import { Item as Schema } from '../repositories/mysql/item.schema';
import { IItemSchema as Schema } from '../repositories/item.schema.interface';
import { Repository } from '../repositories/repository.interface';
import { Item as Model } from '../models/item.model';
import { ItemRequestDto } from '../Controllers/Dtos/item.request';
import { QueryBus } from '@nestjs/cqrs';
import { FindAllItemsQuery } from '../Queries/findall-items.query';
import { FindItemQuery } from '../Queries/find-item.query';

@Injectable()
export class ItemReadService {

    constructor(private queryBus: QueryBus) { }

    FindAll(): Promise<Schema[]> {
        return this.queryBus.execute(
            new FindAllItemsQuery()
        )
    }


    async FindByIdAsync(id: string): Promise<Schema> {
        return this.queryBus.execute(
            new FindItemQuery(id)
        );
    }

}