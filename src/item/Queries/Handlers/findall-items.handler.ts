import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllItemsQuery } from '@item/Queries/findall-items.query';
import { IItemSchema as Schema } from '@item/repositories/item.schema.interface';
import { Repository } from '@item/repositories/repository.interface';
import { Inject } from '@nestjs/common';
import { MysqlToken } from '@item/repositories/mysql/mysql.repository';

@QueryHandler(FindAllItemsQuery)
export class FindAllItemsHandler implements IQueryHandler {
    constructor(@Inject(MysqlToken) private readonly repository: Repository) {}

    execute(query: FindAllItemsQuery): Promise<Schema[]> {
        return this.repository.findAll();
    }
}
