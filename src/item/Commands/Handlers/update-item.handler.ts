import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Item } from "src/item/models/item.model";
import { Repository } from "src/item/repositories/repository.interface";
import { UpdateItemCommand } from "../update-item.command";
import { MongoToken } from "src/item/repositories/mongo/mongo.repository";

@CommandHandler(UpdateItemCommand)
export class UpdateItemHandler implements ICommandHandler<UpdateItemCommand> {
    constructor(@Inject(MongoToken) private readonly repository: Repository) {}

    execute(command: UpdateItemCommand): Promise<void> {
        const item = new Item({
            uuid: command.uuid,
            name: command.name,
            cost: command.cost,
            quantity: command.quantity
        })
        return this.repository.updateById(command.uuid, item)
    }

}