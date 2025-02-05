import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { Products } from './products.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(productData: Partial<Products>): Promise<Products> {
    try {
      if (!productData.name || !productData.price || productData.stock === undefined) {
        throw new BadRequestException('El nombre, precio y stock son obligatorios');
      }
      return await this.productRepository.createProduct(productData);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  async updateProduct(id: string, productData: Partial<Products>): Promise<Products> {
    try {
      const product = await this.productRepository.updateProduct(id, productData);
      if (!product) throw new NotFoundException('Producto no encontrado');
      return product;
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el producto');
    }
  }

  async updateStock(id: string, quantity: number): Promise<Products> {
    try {
      if (quantity === 0) {
        throw new BadRequestException('La cantidad no puede ser cero');
      }

      const product = await this.productRepository.updateStock(id, quantity);
      if (!product) throw new NotFoundException('Producto no encontrado');

      return product;
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el stock del producto');
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      const product = await this.productRepository.getProductById(id);
      if (!product) throw new NotFoundException('Producto no encontrado');

      await this.productRepository.deleteProduct(id);
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el producto');
    }
  }

  async getProductById(id: string): Promise<Products> {
    try {
      const product = await this.productRepository.getProductById(id);
      if (!product) throw new NotFoundException('Producto no encontrado');
      return product;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener el producto');
    }
  }

  async getAllProducts(): Promise<Products[]> {
    try {
      return await this.productRepository.getAllProducts();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los productos');
    }
  }
}
