import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeRepository } from './employee.repository';
import { EmployeeController } from './employee.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository, PrismaService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
