export interface IEventSchema {
    uuid: string;
    aggregateId: string;
    eventName: string;
    snapshot: boolean;
    eventData: any;
}