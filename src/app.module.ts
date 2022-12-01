import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from '@item/item.module';
import { Item } from '@item/repositories/mysql/item.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-catalog-mongo'),
    ItemModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'testedb',
      entities: [Item],
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
