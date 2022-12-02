import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemRequestDto } from '@item/Controllers/Dtos/item.request';
import { ItemService } from '@item/Services/item.service';

@Controller('item')
export class ItemCommandController {
  constructor(private readonly itemService: ItemService) {}

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
  async Update(
    @Param('id') id: string,
    @Body() itemRequestDto: ItemRequestDto,
  ) {
    await this.itemService.Update(id, itemRequestDto);
  }
}
