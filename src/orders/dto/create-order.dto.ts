// src/orders/dto/create-order.dto.ts

import { IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  // 💡 NOTA: El userId se obtendrá del token JWT en el controlador, no del body.
  
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[]; // Array de OrderItemDto
}