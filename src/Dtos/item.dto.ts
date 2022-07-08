export class ItemDto{
    id: string;
    name: string;
    quantity: number;
    cost: number;

    public constructor(init?:Partial<ItemDto>) {
        Object.assign(this, init);
    }
}