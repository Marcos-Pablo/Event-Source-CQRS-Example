import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from '@event/repositories/mongo/event.schema';
import { EventMongoRepository } from '@event/repositories/mongo/event.mongo.repository';
import { EventRepository } from '@event/repositories/event.repository';
import { EventFactory } from '@commons/factories/event-factory';
import { SnapshotModule } from '@snapshot/snapshot.module';
import { EventService } from '@event/services/event.service';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
        SnapshotModule,
        CqrsModule,
    ],
    exports: [EventRepository, EventService],
    providers: [
        {
            provide: EventRepository,
            useClass: EventMongoRepository,
        },
        EventFactory,
        EventService,
    ],
})
export class EventModule {}
