export class Item {
    uuid: string;
    name: string;
    quantity: number;
    cost: number;

    public constructor(init?:Partial<Item>) {
        Object.assign(this, init);
    }
}