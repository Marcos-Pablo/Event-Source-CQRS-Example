import { ItemDto } from 'src/Dtos/item.dto';
import { Item } from '../schemas/item.schema';

declare module '../schemas/item.schema' {
    interface Item {
        AsDto(): ItemDto;
    }


}

Item.prototype.AsDto = function (): ItemDto {
    let itemDto = new ItemDto();
    itemDto.id = this.id;
    itemDto.cost = this.cost;
    itemDto.quantity = this.quantity;
    itemDto.name = this.name

    return itemDto;
}

export {};
