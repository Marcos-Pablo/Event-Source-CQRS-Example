export class Snapshot {
  constructor(
    readonly uuid: string,
    readonly aggregateId: string,
    readonly eventName: string,
    readonly eventData: any,
  ) {}
}
