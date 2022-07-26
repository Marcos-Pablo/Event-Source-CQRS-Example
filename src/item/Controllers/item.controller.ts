import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ItemRequestDto } from "src/item/Controllers/Dtos/item.request";
import { ItemService } from "src/item/Services/item.service";
import { Item } from "../models/item.model";
import { v4 as uuidv4 } from 'uuid';
import { ItemResponseDto } from "./Dtos/item.response";

@Controller("item")
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

    @Post()
    async Create(@Body() itemRequestDto: ItemRequestDto) {
        return await this.itemService.Create(itemRequestDto);
    }

    @Delete(':id')
    @HttpCode(204)
    async Delete(@Param('id') id: string) {
        await this.itemService.DeleteById(id);
    }

    @Patch(':id')
    @HttpCode(204)
    async Update(@Param('id') id: string, @Body() itemRequestDto: ItemRequestDto) {

        await this.itemService.Update(id, itemRequestDto)
    }
}
