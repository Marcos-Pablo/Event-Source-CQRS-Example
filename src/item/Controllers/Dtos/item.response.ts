import { Item } from "src/item/repositories/mongo/item.schema";
// import { Item } from "src/item/repositories/mysql/item.schema";
import { IItemSchema } from "src/item/repositories/item.schema.interface"

export class ItemResponseDto{
    uuid: string;
    name: string;
    quantity: number;
    cost: number;

    static createFromSchema(itemSchema: IItemSchema): ItemResponseDto{
        const itemResponse = new ItemResponseDto();
        itemResponse.uuid = itemSchema.uuid,
        itemResponse.name = itemSchema.name,
        itemResponse.cost = itemSchema.cost,
        itemResponse.quantity = itemSchema.quantity

        return itemResponse;
    }
}