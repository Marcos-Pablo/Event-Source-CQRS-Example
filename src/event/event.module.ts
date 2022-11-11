import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Event, EventSchema } from "./repositories/mongo/event.schema";
import { EventMongoRepository } from "./repositories/mongo/event.mongo.repository";
import { EventRepository } from "./repositories/event.repository";
import { EventFactory } from "./factories/event-factory";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    ],
    exports: [EventRepository, EventFactory],
    providers: [
        {
            provide: EventRepository,
            useClass: EventMongoRepository
        },
        EventFactory
    ],
})
export class EventModule { }