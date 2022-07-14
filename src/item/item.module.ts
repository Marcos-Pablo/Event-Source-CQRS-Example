import { Module } from '@nestjs/common';
import { ItemService } from './Services/item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/item/repositories/mongo/item.schema';
import { ItemController } from './Controllers/item.controller';
import { MongoRepository } from './repositories/mongo/mongo.repository'
import { Repository } from "./repositories/repository.interface"

@Module({
  imports: [MongooseModule.forFeature([{name: Item.name, schema: ItemSchema}])],
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
