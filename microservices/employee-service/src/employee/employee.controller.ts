import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Prisma } from '@prisma/client';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @Get(':id')
  getEmployeeById(@Param('id') id: string) {
    return this.employeeService.getEmployeeById(id);
  }

  @Post()
  createEmployee(@Body() data: Prisma.EmployeeCreateInput) {
    return this.employeeService.createEmployee(data);
  }

  @Put(':id')
  updateEmployee(@Param('id') id: string, @Body() data: Prisma.EmployeeUpdateInput) {
    return this.employeeService.updateEmployee(id, data);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: string) {
    return this.employeeService.deleteEmployee(id);
  }
}
