/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Inject, Patch, Post, Put, Param, Body } from '@nestjs/common';
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

  /** -------------------- PRODUCTOS -------------------- */

  /** 🟢 Obtener todos los productos */
  @Get('products')
  getProducts(): Observable<any> {
    return this.productServiceClient.send({ cmd: 'get-products' }, {});
  }

  /** 🔵 Obtener un producto por su ID */
  @Get('products/:id')
  getProductById(@Param('id') id: string): Observable<any> {
    return this.productServiceClient.send({ cmd: 'get-product-by-id' }, id);
  }

  /** 🟠 Crear un producto */
  @Post('products')
  createProduct(@Body() productData: any): Observable<any> {
    return this.productServiceClient.send({ cmd: 'post-products' }, productData);
  }

  /** 🟡 Actualizar un producto completo */
  @Put('products/:id')
  updateProduct(@Param('id') id: string, @Body() productData: any): Observable<any> {
    return this.productServiceClient.send({ cmd: 'put-products' }, { id, productData });
  }

  /** 🔴 Actualizar stock de un producto */
  @Patch('products/:id/stock')
  updateStock(@Param('id') id: string, @Body() data: { quantity: number }): Observable<any> {
    return this.productServiceClient.send({ cmd: 'patch-stock' }, { id, quantity: data.quantity });
  }

  /** ⚫ Eliminar un producto */
  @Delete('products/:id')
  deleteProduct(@Param('id') id: string): Observable<any> {
    return this.productServiceClient.send({ cmd: 'delete-products' }, id);
  }

  /** -------------------- INVENTARIO -------------------- */

  @Get('inventory')
  getInventories(): Observable<any> {
    return this.inventoryServiceClient.send({ cmd: 'get-inventory' }, {});
  }

  @Post('inventory')
  postInventories(): Observable<any> {
    return this.inventoryServiceClient.send({ cmd: 'post-inventory' }, {});
  }

  /** -------------------- EMPLEADOS -------------------- */

    /** 🟢 Registro de empleados */
  @Post('auth/register')
  registerEmployee(@Body() data: any): Observable<any> {
    return this.employeeServiceClient.send({ cmd: 'register' }, data);
  }

  /** 🔵 Inicio de sesión */
  @Post('auth/login')
  loginEmployee(@Body('token') token: string): Observable<any> {
    return this.employeeServiceClient.send({ cmd: 'login' }, { token });
  }
  /** -------------------- CHAT -------------------- */

  /** -------------------- CHAT -------------------- */

  @Get('chats')
  getChats(): Observable<any> {
    return this.chatServiceClient.send({ cmd: 'get-chats' }, {});
  }
}
