import { Module } from '@nestjs/common';
import { ItemService } from './Services/item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/item/repositories/mongo/item.schema';
import { Item as MysqlItemSchema } from './repositories/mysql/item.schema';
import { ItemController } from './Controllers/item.controller';
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

export const CommandHandlers = [CreateItemHandler, UpdateItemHandler, DeleteItemHandler];
export const EventHandlers =  [FindAllItemsHandler, FindItemHandler];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    TypeOrmModule.forFeature([MysqlItemSchema]),
    CqrsModule
  ],
  controllers: [ItemController, ItemQueryController],
  providers: [
    ItemService,
    ItemReadService,
    {provide:MysqlToken, useClass:MysqlRepository},
    {provide:MongoToken, useClass:MongoRepository},
    ...CommandHandlers,
    ...EventHandlers
  ],
})
export class ItemModule { }
