import { CacheModule, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from '@item/item.module';
import { Item } from '@item/repositories/mysql/item.schema';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';

export const REDIS_CACHE = 'REDIS_CACHE';

@Global()
@Module({
    imports: [
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            host: 'localhost',
            port: 6379,
        }),
        ConfigModule,
        MongooseModule.forRoot('mongodb://localhost:27017/Event-Source-CQRS-Example-mongo'),
        ItemModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'Event-Source-CQRS-Example-MySQL',
            entities: [Item],
            synchronize: true,
        }),
    ],
    controllers: [],
    providers: [],
    exports: [ConfigModule],
})
export class AppModule {}
