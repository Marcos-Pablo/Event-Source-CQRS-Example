export interface IItemSchema {
    uuid: string;
    name: string;
    quantity: number;
    cost: number;
    deletedAt: Date | null;
}
