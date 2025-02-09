// src/chat/chat.gateway.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat/chat.gateway';
import { AuthService } from './auth/auth.service';
import { ChatService } from './chat/chat.service';
import { EncryptionService } from './utils/encryption.service';
import { Socket, Server } from 'socket.io';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let authService: AuthService;
  let chatService: ChatService;
  let encryptionService: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        {
          provide: AuthService,
          useValue: {
            validateToken: jest.fn(),
          },
        },
        {
          provide: ChatService,
          useValue: {
            getChatHistory: jest.fn(),
            saveMessage: jest.fn(),
          },
        },
        {
          provide: EncryptionService,
          useValue: {
            decryptData: jest.fn(),
          },
        },
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
    authService = module.get<AuthService>(AuthService);
    chatService = module.get<ChatService>(ChatService);
    encryptionService = module.get<EncryptionService>(EncryptionService);

    gateway.server = { emit: jest.fn() } as unknown as Server;
  });

  it('should handle connection and load messages', async () => {
    const client = { handshake: { query: { token: 'valid-token' } }, id: '1', emit: jest.fn(), disconnect: jest.fn() } as unknown as Socket;

    jest.spyOn(authService, 'validateToken').mockResolvedValue({ uid: '123' });
    jest.spyOn(chatService, 'getChatHistory').mockResolvedValue([]);

    await gateway.handleConnection(client);

    expect(authService.validateToken).toHaveBeenCalledWith('valid-token');
    expect(chatService.getChatHistory).toHaveBeenCalled();
    expect(client.emit).toHaveBeenCalledWith('loadMessages', []);
  });
});