export class Event {
    constructor(
        readonly uuid: string,
        readonly aggregateId: string,
        readonly eventName: string,
        readonly eventData: any,
    ) { }
}