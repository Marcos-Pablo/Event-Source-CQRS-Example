import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Event, EventSchema } from "./repositories/mongo/event.schema";
import { EventMongoRepository } from "./repositories/mongo/event.mongo.repository";
import { EventRepository } from "./repositories/event.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    ],
    exports: [EventRepository],
    providers: [
        {
            provide: EventRepository,
            useClass: EventMongoRepository
        }
    ],
})
export class EventModule { }