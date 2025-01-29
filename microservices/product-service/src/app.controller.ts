import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'get-products' })  // Este debe coincidir con el cmd que envías desde el API Gateway
  getProducts() {
    // Aquí va la lógica para recuperar los productos
    return { message: 'List of products' };  // Ejemplo de respuesta
  }
}
