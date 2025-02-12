import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryLogController } from './inventory.controller';
import { InventoryRepository } from './inventory.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryLog } from './inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryLog])],
  controllers: [InventoryLogController],
  providers: [InventoryService, InventoryRepository],
})
export class InventoryLogModule {}
