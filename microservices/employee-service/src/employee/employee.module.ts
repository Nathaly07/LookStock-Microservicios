import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeRepository } from './employee.repository';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [EmployeeService, EmployeeRepository, PrismaService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
