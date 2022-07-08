import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from './Modules/item.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-catalog-mongo'),
    ItemModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
