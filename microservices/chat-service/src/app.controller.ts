import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'get-chats' })
  
  getChats() {
    return { message: 'List of Chats' };
  }
}
