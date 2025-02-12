import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryLogModule } from './inventory/inventory.module';
import { InventoryLog } from './inventory/inventory.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: 1433,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [InventoryLog],
      synchronize: false,
      options: { encrypt: true, trustServerCertificate: true },
    }),
    InventoryLogModule,
  ],
})
export class AppModule {}
