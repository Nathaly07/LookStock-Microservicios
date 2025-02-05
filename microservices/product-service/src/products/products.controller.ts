import { Controller } from '@nestjs/common';
import { ProductService } from './products.service';
import { Products } from './products.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /** 🟠 Crear un nuevo producto */
  @MessagePattern({ cmd: 'post-products' })
  async createProduct(@Payload() productData: Partial<Products>) {
    return await this.productService.createProduct(productData);
  }

  /** 🟡 Actualizar un producto (PUT) */
  @MessagePattern({ cmd: 'put-products' })
  async updateProduct(@Payload() data: { id: string; productData: Partial<Products> }) {
    return await this.productService.updateProduct(data.id, data.productData);
  }

  /** 🔴 Actualizar stock (PATCH) */
  @MessagePattern({ cmd: 'patch-stock' })
  async updateStock(@Payload() data: { id: string; quantity: number }) {
    return await this.productService.updateStock(data.id, data.quantity);
  }

  /** ⚫ Eliminar un producto */
  @MessagePattern({ cmd: 'delete-products' })
  async deleteProduct(@Payload() id: string) {
    return await this.productService.deleteProduct(id);
  }

  /** 🔵 Obtener un producto por ID */
  @MessagePattern({ cmd: 'get-product-by-id' })
  async getProductById(@Payload() id: string) {
    return await this.productService.getProductById(id);
  }

  /** 🟢 Obtener todos los productos */
  @MessagePattern({ cmd: 'get-products' })
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }
}
