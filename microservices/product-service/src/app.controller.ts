import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'get-products' })
  
  getProducts() {
    return { message: 'List of products' };
  }
}
