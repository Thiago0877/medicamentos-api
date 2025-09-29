// src/products/product.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // Nombre del medicamento/producto

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stock: number; // Cantidad disponible

  // Agrega otros campos como 'categoria', 'fabricante', etc.
}