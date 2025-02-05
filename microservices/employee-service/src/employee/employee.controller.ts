import { Controller } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Prisma } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @MessagePattern({ cmd: 'get-employees' })
  getAllEmployees() {
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
