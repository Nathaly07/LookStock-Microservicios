import { Controller, Get, Post, Param, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('EMPLOYEE_SERVICE') private readonly employeeServiceClient: ClientProxy
  ) {}

  /** 🟢 Obtener un empleado por ID */
  @Get('employees/:id')
  getEmployeeById(@Param('id') id: string): Observable<any> {
    return this.employeeServiceClient.send({ cmd: 'get-employee-by-uid' }, { uid: id });
  }

  /** 🔵 Registrar un nuevo empleado */
  @Post('employees')
  createEmployee(@Body() data: any): Observable<any> {
    return this.employeeServiceClient.send({ cmd: 'register' }, data);
  }
}


