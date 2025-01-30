/* eslint-disable prettier/prettier */
import { Controller, Get, Inject  } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller("api")
export class AppController {
  constructor(
    @Inject('EMPLOYEE_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('INVENTORY_SERVICE') private readonly inventoryServiceClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productServiceClient: ClientProxy,
    @Inject('CHAT_SERVICE') private readonly chatServiceClient: ClientProxy,
  ) {}

  @Get('products')
  getProducts(): Observable<any> {
    return this.productServiceClient.send({ cmd: 'get-products' }, {});
  }

  @Get('inventory')
  getInventories(): Observable<any> {
    return this.inventoryServiceClient.send({ cmd: 'get-inventory' }, {});
  }

  @Get('employee')
  getEmployees(): Observable<any> {
    return this.userServiceClient.send({ cmd: 'get-employees' }, {});
  }

  @Get('chat')
  getChats(): Observable<any> {
    return this.chatServiceClient.send({ cmd: 'get-chats' }, {});
  }
}
