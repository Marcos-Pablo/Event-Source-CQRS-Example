import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Repository } from '@item/repositories/repository.interface';
import { MysqlToken } from '@item/repositories/mysql/mysql.repository';
import { ItemDeletedEvent } from '@item/events/item-deleted.event';
import { EventService } from '@event/services/event.service';

@EventsHandler(ItemDeletedEvent)
export class ItemDeletedEventHandler
    implements IEventHandler<ItemDeletedEvent>
{
    constructor(
        @Inject(MysqlToken) private readonly repository: Repository,
        private readonly eventService: EventService,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) {}

    async handle(event: ItemDeletedEvent) {
        this.eventService.snapshotHandle(event.uuid);
        await this.cacheService.del(event.uuid);
        await this.repository.deleteById(event.uuid);
    }
}
