import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectRepository(Chat)
    private readonly repository: Repository<Chat>,
  ) {}

  async saveMessage(employeeId: string, message: string, timestamp: Date): Promise<Chat> {
    const newMessage = this.repository.create({ employeeId, message, timestamp });
    return await this.repository.save(newMessage);
  }

  async getChatHistory(): Promise<Chat[]> {
    return await this.repository.find({
      order: { timestamp: 'ASC' },
    });
  }
}