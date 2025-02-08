// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Chat } from './chat/chat.entity';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga las variables de entorno
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: 1433,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Chat], // Registra la entidad Chat
      synchronize: false, // No usar en producción
      options: { encrypt: true, trustServerCertificate: true }, // Configuración para Azure SQL
    }),
    AuthModule, // Importa el módulo de autenticación
    ChatModule, // Importa el módulo de chat
  ],
})
export class AppModule {}