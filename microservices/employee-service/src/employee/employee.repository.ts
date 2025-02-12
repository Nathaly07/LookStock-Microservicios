import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Employee } from '@prisma/client';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEmployee(uid: string, data: any): Promise<Employee> {
    return this.prisma.employee.create({  // 🔹 Cambiado de `employees` a `employee`
      data: {
        id: uid,
        name: data.name,
        role: data.role,
        phone: data.phone,
        photo: data.photo || null,
        isActive: true,
        creationDate: new Date(),
      },
    });
  }

  async findEmployeeByUid(uid: string): Promise<Employee | null> {
    return this.prisma.employee.findUnique({ where: { id: uid } }); // 🔹 Cambiado `employees` a `employee`
  }
}
