import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { ProductRepository } from './products.repository';
import { Products } from './products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])], // Registramos la entidad para TypeORM
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService], // Exportamos el servicio para ser usado en otros módulos si es necesario
})
export class ProductModule {}
