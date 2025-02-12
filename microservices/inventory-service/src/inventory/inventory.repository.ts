import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryLog } from './inventory.entity';

@Injectable()
export class InventoryRepository {
  constructor(
    @InjectRepository(InventoryLog)
    private readonly inventoryRepo: Repository<InventoryLog>,
  ) {}

  async saveLog(log: Partial<InventoryLog>): Promise<InventoryLog> {
    return await this.inventoryRepo.save(log);
  }

  async getAllLogs(): Promise<InventoryLog[]> {
    return await this.inventoryRepo.find({ order: { timestamp: 'DESC' } });
  }
}