export interface IEventBase {
    uuid: string;
    aggregateId: string;
    eventName: string;
    eventData: any;
}
