import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepo: EmployeeRepository) {}

  async registerEmployee(uid: string, data: any) {
    return await this.employeeRepo.createEmployee(uid, data);
  }

  async getEmployeeByUid(uid: string) {
    const employee = await this.employeeRepo.findEmployeeByUid(uid);
    if (!employee) throw new Error('Usuario no encontrado');
    return { employee };
  }
}
