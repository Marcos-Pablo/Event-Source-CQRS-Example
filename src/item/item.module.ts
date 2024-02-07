import { Module } from '@nestjs/common';
import { ItemService } from '@item/Services/item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from '@item/repositories/mongo/item.schema';
import { Item as MysqlItemSchema } from '@item/repositories/mysql/item.schema';
import { ItemCommandController } from '@item/Controllers/item.command.controller';
import { MongoRepository, MongoToken } from '@item/repositories/mongo/mongo.repository'
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlRepository, MysqlToken } from '@item/repositories/mysql/mysql.repository';
import { CreateItemHandler } from '@item/Commands/Handlers/create-item.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateItemHandler } from '@item/Commands/Handlers/update-item.handler';
import { DeleteItemHandler } from '@item/Commands/Handlers/delete-item.handler';
import { ItemQueryController } from '@item/Controllers/item.query.controller';
import { FindAllItemsHandler } from '@item/Queries/Handlers/findall-items.handler';
import { FindItemHandler } from '@item/Queries/Handlers/find-item.handler';
import { ItemCreatedEventHandler } from '@item/events/handlers/item-created.handler';
import { ItemUpdatedEventHandler } from '@item/events/handlers/item-updated.handler';
import { EventModule } from '@event/event.module';
import { SnapshotModule } from '@snapshot/snapshot.module';

export const CommandHandlers = [CreateItemHandler, UpdateItemHandler, DeleteItemHandler];
export const QueryHandlers = [FindAllItemsHandler, FindItemHandler];
export const EventHandlers = [ItemCreatedEventHandler, ItemUpdatedEventHandler];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    TypeOrmModule.forFeature([MysqlItemSchema]),
    CqrsModule,
    EventModule,
    SnapshotModule
  ],
  controllers: [ItemCommandController, ItemQueryController],
  providers: [
    ItemService,
    { provide: MysqlToken, useClass: MysqlRepository },
    { provide: MongoToken, useClass: MongoRepository },
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class ItemModule { }
