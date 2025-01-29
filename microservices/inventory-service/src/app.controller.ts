import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'get-inventory' })

  getInventories() {
    return { message: 'List of Inventary' };
  }
}
