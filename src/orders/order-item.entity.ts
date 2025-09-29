// src/orders/order-item.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../products/product.entity'; // Importa la entidad Product
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number; // Precio al momento de la compra

  // Relación: Un Item pertenece a un Pedido
  @ManyToOne(() => Order, order => order.items)
  order: Order;

  // Relación: Un Item corresponde a un Producto
  @ManyToOne(() => Product, { eager: true }) // 'eager: true' carga el producto con el item
  product: Product;
}