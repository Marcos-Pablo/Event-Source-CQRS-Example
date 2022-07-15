import { Module } from '@nestjs/common';
import { ItemService } from './Services/item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/item/repositories/mongo/item.schema';
// import { Item } from './repositories/mysql/item.schema';
import { ItemController } from './Controllers/item.controller';
import { MongoRepository } from './repositories/mongo/mongo.repository'
import { Repository } from "./repositories/repository.interface"
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlRepository } from './repositories/mysql/mysql.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Item.name, schema: ItemSchema}])
    // TypeOrmModule.forFeature([Item])
  ],
  controllers: [ItemController],
  providers: [
    ItemService, 
    {
      provide: Repository,
      useClass: MongoRepository,
    },
  ],
})
export class ItemModule { }
