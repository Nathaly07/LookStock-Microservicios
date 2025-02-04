import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';
import { Prisma, Employee } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepo: EmployeeRepository) {}

  getAllEmployees(): Promise<Employee[]> {
    return this.employeeRepo.findAll();
  }

  getEmployeeById(id: string): Promise<Employee | null> {
    return this.employeeRepo.findById(id);
  }

  createEmployee(data: Prisma.EmployeeCreateInput): Promise<Employee> {
    return this.employeeRepo.create(data);
  }

  updateEmployee(id: string, data: Prisma.EmployeeUpdateInput): Promise<Employee> {
    return this.employeeRepo.update(id, data);
  }

  deleteEmployee(id: string): Promise<Employee> {
    return this.employeeRepo.delete(id);
  }
}
