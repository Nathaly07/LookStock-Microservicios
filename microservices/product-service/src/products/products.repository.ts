import { Repository } from 'typeorm';
import { Products } from './products.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductRepository extends Repository<Products> {
  constructor(
    @InjectRepository(Products)
    private readonly repository: Repository<Products>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createProduct(productData: Partial<Products>): Promise<Products> {
    const product = this.repository.create(productData);
    return await this.repository.save(product);
  }

  async updateProduct(id: string, productData: Partial<Products>): Promise<Products> {
    await this.repository.update(id, productData);
    return await this.repository.findOne({ where: { id } });
  }

  async updateStock(id: string, quantity: number): Promise<Products> {
    const product = await this.repository.findOne({ where: { id } });
    if (!product) throw new Error('Producto no encontrado');
    product.stock += quantity;
    return await this.repository.save(product);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getProductById(id: string): Promise<Products> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAllProducts(): Promise<Products[]> {
    return await this.repository.find();
  }
}
