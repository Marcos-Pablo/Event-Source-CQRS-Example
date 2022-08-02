import { Event as Model } from "../models/event.model";

export abstract class EventRepository {
    abstract create(event: Model): Promise<void>;
}