import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { MongoToken } from "src/item/repositories/mongo/mongo.repository";
import { Repository } from "src/item/repositories/repository.interface";
import { DeleteItemCommand } from "../delete-item.command";

@CommandHandler(DeleteItemCommand)
export class DeleteItemHandler implements ICommandHandler<DeleteItemCommand> {
    constructor(@Inject(MongoToken) private readonly repository: Repository) {}

    execute(command: DeleteItemCommand): Promise<void> {
        return this.repository.deleteById(command.id);
    }
}