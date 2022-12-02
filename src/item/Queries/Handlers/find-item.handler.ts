import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from '@item/repositories/repository.interface';
import { FindItemQuery } from '@item/Queries/find-item.query';
import { IItemSchema as Schema } from '@item/repositories/item.schema.interface';
import { MysqlToken } from '@item/repositories/mysql/mysql.repository';
import { Inject } from '@nestjs/common';

@QueryHandler(FindItemQuery)
export class FindItemHandler implements IQueryHandler {
  constructor(@Inject(MysqlToken) private readonly repository: Repository) {}

  execute(query: FindItemQuery): Promise<Schema> {
    return this.repository.findById(query.id);
  }
}
