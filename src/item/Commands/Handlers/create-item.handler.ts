import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Item } from "src/item/models/item.model";
import { Repository } from "src/item/repositories/repository.interface";
import { CreateItemCommand } from "../create-item.command";
import {v4 as uuidv4} from 'uuid';
import { MongoToken } from "src/item/repositories/mongo/mongo.repository";
import { Inject } from "@nestjs/common";
import { ExportItemCreatedEvent } from "src/item/Events/export-item-created.event";
import { MysqlToken } from "src/item/repositories/mysql/mysql.repository";

@CommandHandler(CreateItemCommand)
export class CreateItemHandler implements ICommandHandler<CreateItemCommand> {
  constructor(
    @Inject(MongoToken) private readonly repository: Repository, 
    private readonly eventBus: EventBus,
    @Inject(MysqlToken) private readonly mysqlRepository: Repository
  ) {}

  async execute(command: CreateItemCommand): Promise<void> {
    const item = new Item({
      uuid: uuidv4(),
      name: command.name,
      cost: command.cost,
      quantity: command.quantity
    })

    this.repository.create(item);
    this.mysqlRepository.create(item);
    // this.eventBus.publish(new ExportItemCreatedEvent(item.uuid, item.name, item.quantity, item.cost));
  }
}