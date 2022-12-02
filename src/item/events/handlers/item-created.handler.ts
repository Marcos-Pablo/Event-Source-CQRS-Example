import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ItemCreatedEvent } from '@item/events/item-created.event';
import { Repository } from '@item/repositories/repository.interface';
import { Item } from '@item/models/item.model';
import { MysqlToken } from '@item/repositories/mysql/mysql.repository';

@EventsHandler(ItemCreatedEvent)
export class ItemCreatedEventHandler
  implements IEventHandler<ItemCreatedEvent>
{
  constructor(@Inject(MysqlToken) private readonly repository: Repository) {}

  handle(event: ItemCreatedEvent) {
    const item = new Item();
    item.uuid = event.uuid;
    item.name = event.name;
    item.cost = event.cost;
    item.quantity = event.quantity;
    item.deletedAt = null;
    this.repository.create(item);
  }
}
