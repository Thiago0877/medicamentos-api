// src/products/products.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller'; // 👈 Necesitas crear este archivo
import { Product } from './product.entity';

@Module({
  imports: [
    // 1. Registra la entidad para TypeORM
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductsController], // 2. Registra el controlador de rutas
  providers: [ProductsService], 
  // 3. Exporta el servicio si otros módulos lo van a inyectar (ej: un módulo de ventas)
  exports: [ProductsService],   
})
export class ProductsModule {}