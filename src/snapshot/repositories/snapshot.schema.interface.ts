export interface ISnapshotSchema {
    uuid: string;
    aggregateId: string;
    eventName: string;
    eventData: any;
}