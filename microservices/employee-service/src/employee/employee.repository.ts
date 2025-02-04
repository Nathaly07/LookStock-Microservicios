import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Employee, Prisma } from '@prisma/client';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Employee[]> {
    return this.prisma.employee.findMany();
  }

  async findById(id: string): Promise<Employee | null> {
    return this.prisma.employee.findUnique({ where: { id } });
  }

  async create(data: Prisma.EmployeeCreateInput): Promise<Employee> { // Cambiar Partial<Employee> por Prisma.EmployeeCreateInput
    return this.prisma.employee.create({ data });
  }

  async update(id: string, data: Prisma.EmployeeUpdateInput): Promise<Employee> { // Cambiar Partial<Employee> por Prisma.EmployeeUpdateInput
    return this.prisma.employee.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Employee> {
    return this.prisma.employee.delete({ where: { id } });
  }
}
