// src/orders/order.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity'; // Importa la entidad User
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  orderDate: Date;

  @Column({ default: 'Pending' }) // Estado del pedido: Pending, Shipped, Delivered, etc.
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  // Relación: Un Pedido pertenece a un Usuario
  @ManyToOne(() => User, user => user.orders)
  user: User;

  // Relación: Un Pedido tiene muchos Items de Pedido
  @OneToMany(() => OrderItem, item => item.order, { cascade: true }) // 'cascade: true' guarda los items automáticamente
  items: OrderItem[];
}