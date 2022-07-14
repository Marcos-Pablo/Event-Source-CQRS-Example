import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-catalog-mongo'),
    ItemModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
