import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Item } from "src/item/models/item.model";
import { Repository } from "src/item/repositories/repository.interface";
import { CreateItemCommand } from "../create-item.command";
import {v4 as uuidv4} from 'uuid';
import { MongoToken } from "src/item/repositories/mongo/mongo.repository";
import { Inject } from "@nestjs/common";

@CommandHandler(CreateItemCommand)
export class CreateItemHandler implements ICommandHandler<CreateItemCommand> {
  constructor(@Inject(MongoToken) private readonly repository: Repository) {}

  async execute(command: CreateItemCommand): Promise<void> {
    const item = new Item({
        uuid: uuidv4(),
        name: command.name,
        cost: command.cost,
        quantity: command.quantity
    })
    this.repository.create(item);
  }
}