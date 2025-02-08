// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { EncryptionService } from '../utils/encryption.service';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async saveMessage(employeeId: string, message: string): Promise<Chat> {
    // Encripta el mensaje antes de guardarlo
    const encryptedMessage = this.encryptionService.encryptData(message);

    // Guarda el mensaje encriptado en la base de datos
    return await this.chatRepository.saveMessage(employeeId, encryptedMessage, new Date());
  }

  async getChatHistory(): Promise<any[]> {
    // Obtiene todos los mensajes
    const messages = await this.chatRepository.getChatHistory();

    // Descifra los mensajes y mapea la información
    return messages.map((msg) => ({
      employeeId: msg.employeeId,
      message: this.encryptionService.decryptData(msg.message),
      timestamp: msg.timestamp,
    }));
  }
}