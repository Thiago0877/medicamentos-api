// src/products/dto/update-product.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

// PartialType hace que todas las propiedades del DTO base sean opcionales
export class UpdateProductDto extends PartialType(CreateProductDto) {}