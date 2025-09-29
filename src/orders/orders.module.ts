// src/orders/orders.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';

// Importar módulos necesarios (con forwardRef para evitar dependencias circulares)
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]), // Registra ambas entidades
    // Usa forwardRef si UsersModule o ProductsModule también inyectan OrdersService
    ProductsModule, 
    UsersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService], 
  exports: [OrdersService], // Exporta si otros módulos necesitan consultar pedidos
})
export class OrdersModule {}