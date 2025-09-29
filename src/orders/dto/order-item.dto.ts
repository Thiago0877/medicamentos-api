// src/orders/dto/order-item.dto.ts

import { IsNumber, IsPositive } from 'class-validator';

export class OrderItemDto {
  @IsNumber()
  @IsPositive()
  productId: number; // ID del producto que se está comprando

  @IsNumber()
  @IsPositive()
  quantity: number; // Cantidad
}