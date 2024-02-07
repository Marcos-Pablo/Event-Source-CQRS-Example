import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SnapshotMongoRepository } from "@snapshot/repositories/mongo/snapshot.mongo.repository";
import { SnapshotRepository } from "@snapshot/repositories/snapshot.repository";
import { Snapshot, SnapshotSchema } from "@snapshot/repositories/mongo/snapshot.schema";
import { EventFactory } from "@commons/factories/event-factory";

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