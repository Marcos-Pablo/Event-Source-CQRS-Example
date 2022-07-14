import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ItemRequestDto } from "src/item/Controllers/Dtos/item.request";
import { ItemService } from "src/item/Services/item.service";
import { Item } from "../models/item.model";
import {v4 as uuidv4} from 'uuid';
import { ItemResponseDto } from "./Dtos/item.response";

@Controller("item")
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

    @Get()
    async FindAll() {
        const items = await this.itemService.FindAll();

        return items.map(item => ItemResponseDto.createFromSchema(item));
    }

    @Get(':id')
    async FindOne(@Param('id') id: string) {
        const item = await this.itemService.FindByIdAsync(id);

        return ItemResponseDto.createFromSchema(item);
    }

    @Post()
    async Create(@Body() itemRequestDto: ItemRequestDto) {
        const item = new Item({
            uuid: uuidv4(),
            name: itemRequestDto.name,
            cost: itemRequestDto.cost,
            quantity: itemRequestDto.quantity
        })
        return await this.itemService.Create(item);
    }

    @Delete(':id')
    @HttpCode(204)
    async Delete(@Param('id') id: string) {
        await this.itemService.DeleteById(id);
    }

    @Patch(':id')
    @HttpCode(204)
    async Update(@Param('id') id: string, @Body() itemRequestDto: ItemRequestDto) {
        const item = new Item({
            uuid: id,
            name: itemRequestDto.name,
            cost: itemRequestDto.cost,
            quantity: itemRequestDto.quantity
        })

        await this.itemService.Update(id, item)
    }
}
