import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ItemRequestDto } from "src/item/Controllers/Dtos/item.request";
import { ItemResponseDto } from "./Dtos/item.response";
import { ItemReadService } from "../Services/item-read.service";

@Controller("item")
export class ItemQueryController {
    constructor(private readonly itemService: ItemReadService) { }

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

}
