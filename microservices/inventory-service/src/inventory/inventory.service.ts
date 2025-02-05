import { Injectable } from '@nestjs/common';
import { InventoryRepository } from './inventory.repository';
import { InventoryLog } from './inventory.entity';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async createLog(logData: Partial<InventoryLog>): Promise<InventoryLog> {
    return await this.inventoryRepository.saveLog(logData);
  }

  async getLogs(): Promise<InventoryLog[]> {
    return await this.inventoryRepository.getAllLogs();
  }
}