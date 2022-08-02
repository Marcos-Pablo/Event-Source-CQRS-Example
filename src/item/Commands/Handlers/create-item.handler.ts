import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Item } from "src/item/models/item.model";
import { EventRepository } from "src/event/repositories/event.repository";
import { CreateItemCommand } from "../create-item.command";
import { v4 as uuidv4 } from 'uuid';
import { Inject } from "@nestjs/common";
import { Event } from "src/event/models/event.model";

@CommandHandler(CreateItemCommand)
export class CreateItemHandler implements ICommandHandler<CreateItemCommand> {
  constructor(
    private readonly repository: EventRepository,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: CreateItemCommand): Promise<void> {
    const item = this.publisher.mergeObjectContext(new Item({
      uuid: uuidv4(),
      name: command.name,
      cost: command.cost,
      quantity: command.quantity
    }))

    this.repository.create(new Event(uuidv4(), 'ItemCreated', item))
    item.create();
    item.commit();
  }
}