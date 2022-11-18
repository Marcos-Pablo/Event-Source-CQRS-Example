import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Event, EventSchema } from "./repositories/mongo/event.schema";
import { EventMongoRepository } from "./repositories/mongo/event.mongo.repository";
import { EventRepository } from "./repositories/event.repository";
import { EventFactory } from "../commons/factories/event-factory";
import { SnapshotModule } from "src/snapshot/snapshot.module";
import { EventService } from "./services/event.service";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
        SnapshotModule,
        CqrsModule
    ],
    exports: [EventRepository, EventService],
    providers: [
        {
            provide: EventRepository,
            useClass: EventMongoRepository
        },
        EventFactory,
        EventService
    ],
})
export class EventModule { }