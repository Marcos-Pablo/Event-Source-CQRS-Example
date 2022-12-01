import { IEventBase } from "@commons/interfaces/event-base.interface";

export interface IEventSchema extends IEventBase {
    snapshot: boolean;
}