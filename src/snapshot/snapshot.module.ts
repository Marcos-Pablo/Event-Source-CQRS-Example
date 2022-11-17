import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SnapshotMongoRepository } from "./repositories/mongo/snapshot.mongo.repository";
import { SnapshotRepository } from "./repositories/snapshot.repository";
import { Snapshot, SnapshotSchema } from "./repositories/mongo/snapshot.schema";
import { EventFactory } from "src/event/factories/event-factory";
import { SnapshotService } from "./services/snapshot.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Snapshot.name, schema: SnapshotSchema }]),
    ],
    exports: [SnapshotRepository],
    providers: [
        {
            provide: SnapshotRepository,
            useClass: SnapshotMongoRepository
        },
        EventFactory,
        SnapshotService
    ],
})
export class SnapshotModule { }