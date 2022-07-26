import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllItemsQuery } from "../findall-items.query";
import { IItemSchema as Schema } from 'src/item/repositories/item.schema.interface';
import { Repository } from "src/item/repositories/repository.interface";
import { Inject } from "@nestjs/common";
import { MysqlToken } from "src/item/repositories/mysql/mysql.repository";

@QueryHandler(FindAllItemsQuery)
export class FindAllItemsHandler implements IQueryHandler {
    constructor(@Inject(MysqlToken) private readonly repository: Repository) { }

    execute(query: FindAllItemsQuery): Promise<Schema[]> {
        return this.repository.findAll();
    }
}