export class Event {
    constructor(
        readonly uuid: string,
        readonly eventName: string,
        readonly eventData: any,
    ) { }
}