// src/chat/chat.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from '../src/chat/chat.service';
import { ChatRepository } from '../src/chat/chat.repository';
import { EncryptionService } from '../src/utils/encryption.service';

describe('ChatService', () => {
  let chatService: ChatService;
  let chatRepository: ChatRepository;
  let encryptionService: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: ChatRepository,
          useValue: {
            saveMessage: jest.fn(),
            getChatHistory: jest.fn(),
          },
        },
        {
          provide: EncryptionService,
          useValue: {
            encryptData: jest.fn(),
            decryptData: jest.fn(),
          },
        },
      ],
    }).compile();

    chatService = module.get<ChatService>(ChatService);
    chatRepository = module.get<ChatRepository>(ChatRepository);
    encryptionService = module.get<EncryptionService>(EncryptionService);
  });

  it('should save a message', async () => {
    const employeeId = '123';
    const message = 'Hello, world!';
    const encryptedMessage = 'encrypted-message';
    const timestamp = new Date();

    jest.spyOn(encryptionService, 'encryptData').mockReturnValue(encryptedMessage);
    jest.spyOn(chatRepository, 'saveMessage').mockResolvedValue({
      id: '1',
      employeeId,
      message: encryptedMessage,
      timestamp,
    });

    const result = await chatService.saveMessage(employeeId, message);

    expect(encryptionService.encryptData).toHaveBeenCalledWith(message);
    expect(chatRepository.saveMessage).toHaveBeenCalledWith(employeeId, encryptedMessage, expect.any(Date));
    expect(result).toEqual({
      id: '1',
      employeeId,
      message: encryptedMessage,
      timestamp,
    });
  });

  it('should get chat history', async () => {
    const messages = [
      {
        id: '1',
        employeeId: '123',
        message: 'encrypted-message-1',
        timestamp: new Date(),
      },
      {
        id: '2',
        employeeId: '456',
        message: 'encrypted-message-2',
        timestamp: new Date(),
      },
    ];

    jest.spyOn(chatRepository, 'getChatHistory').mockResolvedValue(messages);
    jest.spyOn(encryptionService, 'decryptData').mockImplementation((msg) => msg.replace('encrypted-', ''));

    const result = await chatService.getChatHistory();

    expect(chatRepository.getChatHistory).toHaveBeenCalled();
    expect(encryptionService.decryptData).toHaveBeenCalledTimes(2);
    expect(result).toEqual([
      {
        employeeId: '123',
        message: 'message-1',
        timestamp: messages[0].timestamp,
      },
      {
        employeeId: '456',
        message: 'message-2',
        timestamp: messages[1].timestamp,
      },
    ]);
  });
});