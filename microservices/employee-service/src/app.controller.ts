import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'get-employees' })
  
  getEmployees() {
    return { message: 'List of Employee' };
  }
}
