import { Injectable } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs';
import { SnapshotEvent } from 'src/item/events/snapshot.event';
import { ItemCreatedEvent } from '@item/events/item-created.event';
import { ItemDeletedEvent } from '@item/events/item-deleted.event';
import { ItemUpdatedEvent } from '@item/events/item-updated.event';

@Injectable()
export class EventFactory {
  private events = {
    ItemCreatedEvent: ItemCreatedEvent,
    ItemUpdatedEvent: ItemUpdatedEvent,
    ItemDeletedEvent: ItemDeletedEvent,
    Snapshot: SnapshotEvent,
  };
  getEventType(eventName: string): IEvent {
    return this.events[eventName];
  }
}
