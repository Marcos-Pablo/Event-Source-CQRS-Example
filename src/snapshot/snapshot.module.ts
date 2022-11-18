import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SnapshotMongoRepository } from "./repositories/mongo/snapshot.mongo.repository";
import { SnapshotRepository } from "./repositories/snapshot.repository";
import { Snapshot, SnapshotSchema } from "./repositories/mongo/snapshot.schema";
import { EventFactory } from "src/commons/factories/event-factory";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Snapshot.name, schema: SnapshotSchema }])
    ],
    exports: [
        SnapshotRepository
    ],
    providers: [
        {
            provide: SnapshotRepository,
            useClass: SnapshotMongoRepository
        },
        EventFactory
    ],
})
export class SnapshotModule { }