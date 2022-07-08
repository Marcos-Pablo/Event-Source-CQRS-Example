import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { CreateItemDto } from "src/Dtos/create-item.dto";
import { UpdateItemDto } from "src/Dtos/update-item.dto";
import { ItemService } from "../Services/item.service";
import "../Extensions/ItemExtensions"

@Controller("item")
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

    @Get()
    async FindAll() {
        const items = await this.itemService.FindAll();

        return items;
    }

    @Get(':id')
    async FindOne(@Param('id') id: string) {
        const item = await this.itemService.FindByIdAsync(id);

        return item;
    }

    @Post()
    async Create(@Body() createItemDto: CreateItemDto) {
        return await this.itemService.Create(createItemDto);
    }

    @Delete(':id')
    @HttpCode(204)
    async Delete(@Param('id') id: string) {
        await this.itemService.DeleteById(id);
    }

    @Patch(':id')
    @HttpCode(204)
    async Update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
        await this.itemService.Update(id, updateItemDto)
    }
}