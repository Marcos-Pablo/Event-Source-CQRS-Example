export interface IEventSchema {
    uuid: string;
    aggregateId: string;
    eventName: string;
    eventData: any;
}