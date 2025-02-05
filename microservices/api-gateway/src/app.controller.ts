/* eslint-disable prettier/prettier */
import { Controller, Get, Inject, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller("api")
export class AppController {
  constructor(
    @Inject('EMPLOYEE_SERVICE') private readonly employeeServiceClient: ClientProxy,
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

  @Post('inventory')
  postInventories(): Observable<any> {
    return this.inventoryServiceClient.send({ cmd: 'post-inventory' }, {});
  }

  @Get('employees')
  getEmployees(): Observable<any> {
    return this.employeeServiceClient.send({ cmd: 'get-employees' }, {});
  }

  @Get('employees/:id')
  getEmployeeById(@Param('id') id: string): Observable<any> {
    return this.employeeServiceClient.send({ cmd: 'get-employee-by-id' }, id);
  }

  @Post('employees')
  createEmployee(@Body() data: any): Observable<any> {
    return this.employeeServiceClient.send({ cmd: 'create-employee' }, data);
  }

  @Put('employees/:id')
  updateEmployee(@Param('id') id: string, @Body() data: any): Observable<any> {
    return this.employeeServiceClient.send({ cmd: 'update-employee' }, { id, data });
  }

  @Delete('employees/:id')
  deleteEmployee(@Param('id') id: string): Observable<any> {
    return this.employeeServiceClient.send({ cmd: 'delete-employee' }, id);
  }

  @Get('chat')
  getChats(): Observable<any> {
    return this.chatServiceClient.send({ cmd: 'get-chats' }, {});
  }
}
