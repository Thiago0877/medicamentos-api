// src/users/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'; // Añadir OneToMany
import { Order } from '../orders/order.entity'; // 👈 ¡IMPORTACIÓN NECESARIA!

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  roles: string; 

  /**
   * ✅ PROPIEDAD AÑADIDA PARA CORREGIR EL ERROR
   * Define la relación inversa: Un usuario puede tener varios pedidos.
   */
  @OneToMany(() => Order, order => order.user)
  orders: Order[]; // El nombre 'orders' es el que se requiere en order.entity.ts
}