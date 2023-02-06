import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from '@item/repositories/repository.interface';
import { FindItemQuery } from '@item/Queries/find-item.query';
import { IItemSchema as Schema } from '@item/repositories/item.schema.interface';
import { MysqlToken } from '@item/repositories/mysql/mysql.repository';
import { CACHE_MANAGER, Inject, Query } from '@nestjs/common';
import { Cache } from 'cache-manager';

@QueryHandler(FindItemQuery)
export class FindItemHandler implements IQueryHandler {
    constructor(
        @Inject(MysqlToken) private readonly repository: Repository,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) {}

    async execute(query: FindItemQuery): Promise<Schema> {
        const cachedItem = await this.cacheService.get(query.id);
        if (cachedItem && typeof cachedItem === 'string') {
            return JSON.parse(cachedItem);
        }

        const item = this.repository.findById(query.id);
        return item;
    }
}
