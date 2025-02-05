import { Controller } from '@nestjs/common';
import { ProductService } from './products.service';
import { Products } from './products.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'post-products' })
  async createProduct(@Payload() productData: Partial<Products>) {
    return await this.productService.createProduct(productData);
  }

  @MessagePattern({ cmd: 'put-products' })
  async updateProduct(@Payload() data: { id: string; productData: Partial<Products> }) {
    return await this.productService.updateProduct(data.id, data.productData);
  }

  @MessagePattern({ cmd: 'patch-stock' }) // Cambiado para diferenciar de get-products
  async updateStock(@Payload() data: { id: string; quantity: number }) {
    return await this.productService.updateStock(data.id, data.quantity);
  }

  @MessagePattern({ cmd: 'delete-products' })
  async deleteProduct(@Payload() id: string) {
    return await this.productService.deleteProduct(id);
  }

  @MessagePattern({ cmd: 'get-product-by-id' }) // Se cambia el nombre para evitar conflicto con get-products
  async getProductById(@Payload() id: string) {
    return await this.productService.getProductById(id);
  }

  @MessagePattern({ cmd: 'get-products' })
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }
}
