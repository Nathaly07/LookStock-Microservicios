import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from '../auth/auth.service';
import { EmployeeService } from './employee.service';

@Controller()
export class EmployeeController {
  constructor(
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService,
  ) {}

  @MessagePattern({ cmd: 'register' })
  async register(data: any) {
    const { token, ...employeeData } = data;
    const { uid } = await this.authService.validateToken(token);
    return await this.employeeService.registerEmployee(uid, employeeData);
  }

  @MessagePattern({ cmd: 'login' })
  async login(data: { token: string }) {
    const { uid } = await this.authService.validateToken(data.token);
    return await this.employeeService.getEmployeeByUid(uid);
  }
}
