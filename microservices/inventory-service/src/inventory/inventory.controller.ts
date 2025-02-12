import { Controller, Post, Body, Get } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('inventory')
export class InventoryLogController {
  constructor(private readonly inventoryService: InventoryService) {}

  @MessagePattern({ cmd: 'post-inventory' })
  @Post()
  async createLog(@Body() logData: any) {
    return await this.inventoryService.createLog(logData);
  }

  @MessagePattern({ cmd: 'get-inventory' })
  @Get()
  async getLogs() {
    return await this.inventoryService.getLogs();
  }
}