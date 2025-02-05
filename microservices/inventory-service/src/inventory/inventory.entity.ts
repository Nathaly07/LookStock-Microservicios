import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity('inventory_logs')
export class InventoryLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column()
  employeeId: string;

  @Column({ name: 'tipo_movimiento' })
  type: string;

  @Column('int')
  quantityChange: number;

  @Column({ nullable: true })
  comment?: string;

  @CreateDateColumn()
  timestamp: Date;
}