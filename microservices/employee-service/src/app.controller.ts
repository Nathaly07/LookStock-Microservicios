import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployeeService } from './employee/employee.service';
import { Prisma } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly employeeService: EmployeeService) {}

  @MessagePattern({ cmd: 'get-employees' })
  getEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @MessagePattern({ cmd: 'get-employee-by-id' })
  getEmployeeById(@Payload() id: string) {
    return this.employeeService.getEmployeeById(id);
  }

  @MessagePattern({ cmd: 'create-employee' })
  createEmployee(@Payload() data: Prisma.EmployeeCreateInput) {
    return this.employeeService.createEmployee(data);
  }

  @MessagePattern({ cmd: 'update-employee' })
  updateEmployee(@Payload() payload: { id: string; data: Prisma.EmployeeUpdateInput }) {
    return this.employeeService.updateEmployee(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete-employee' })
  deleteEmployee(@Payload() id: string) {
    return this.employeeService.deleteEmployee(id);
  }
}

