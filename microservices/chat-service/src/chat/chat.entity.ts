// src/chat/chat.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column()
  timestamp: Date;

  @Column({ name: 'employee_id' }) // Almacena el ID del empleado como una columna simple
  employeeId: string;
}