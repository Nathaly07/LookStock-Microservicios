// src/chat/chat.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { AuthService } from '../auth/auth.service';
import { EncryptionService } from '../utils/encryption.service';
import { ChatRepository } from './chat.repository';
import { Chat } from './chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])], // Registra la entidad Chat
  providers: [
    ChatService,
    ChatGateway,
    AuthService,
    EncryptionService,
    ChatRepository, // Registra el repositorio
  ],
})
export class ChatModule {}