import { Module } from '@nestjs/common';
import { ItemService } from './Services/item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/item/repositories/mongo/item.schema';
import { Item as MysqlItemSchema } from './repositories/mysql/item.schema';
import { ItemCommandController } from './Controllers/item.command.controller';
import { MongoRepository, MongoToken } from './repositories/mongo/mongo.repository'
import { Repository } from "./repositories/repository.interface"
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlRepository, MysqlToken } from './repositories/mysql/mysql.repository';
import { CreateItemHandler } from './Commands/Handlers/create-item.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateItemHandler } from './Commands/Handlers/update-item.handler';
import { DeleteItemHandler } from './Commands/Handlers/delete-item.handler';
import { ItemReadService } from './Services/item-read.service';
import { ItemQueryController } from './Controllers/item.query.controller';
import { FindAllItemsHandler } from './Queries/Handlers/findall-items.handler';
import { FindItemHandler } from './Queries/Handlers/find-item.handler';
import { ExportItemCreatedEvent } from './Events/export-item-created.event';

export const CommandHandlers = [CreateItemHandler, UpdateItemHandler, DeleteItemHandler];
export const QueryHandlers =  [FindAllItemsHandler, FindItemHandler];
export const EventHandlers =  [ExportItemCreatedEvent];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    TypeOrmModule.forFeature([MysqlItemSchema]),
    CqrsModule
  ],
  controllers: [ItemCommandController, ItemQueryController],
  providers: [
    ItemService,
    ItemReadService,
    {provide:MysqlToken, useClass:MysqlRepository},
    {provide:MongoToken, useClass:MongoRepository},
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ],
})
export class ItemModule { }
