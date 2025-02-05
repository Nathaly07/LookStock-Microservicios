import { Controller, Get, Post, Put, Delete, Param, Body, Patch } from '@nestjs/common';
import { ProductService } from './products.service';
import { Products } from './products.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() productData: Partial<Products>) {
    return await this.productService.createProduct(productData);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() productData: Partial<Products>) {
    return await this.productService.updateProduct(id, productData);
  }

  @Patch(':id/stock')
  async updateStock(@Param('id') id: string, @Body('quantity') quantity: number) {
    return await this.productService.updateStock(id, quantity);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }
}
