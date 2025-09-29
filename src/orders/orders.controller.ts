// src/orders/orders.controller.ts

import { Controller, Get, Post, Body, Param, ParseIntPipe, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
// Asumiendo que ya tienes un JwtAuthGuard en tu módulo de autenticación
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; 

@Controller('orders')
// @UseGuards(JwtAuthGuard) // Protege todas las rutas de este controlador
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // POST /orders (Crear un nuevo pedido)
  // Requiere autenticación
  @UseGuards(JwtAuthGuard) 
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Request() req, @Body() createOrderDto: CreateOrderDto): Promise<Order> {
    // El ID del usuario se obtiene del payload del token JWT (req.user.id o req.user.sub)
    const userId = req.user.sub; // Usa 'sub' o 'id' según cómo lo configuraste en tu AuthService
    return this.ordersService.create(userId, createOrderDto);
  }

  // GET /orders (Solo para administradores o el usuario dueño de los pedidos)
  @Get()
  // Aquí podrías agregar un @UseGuards(RolesGuard) para limitar acceso a Admins
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  // GET /orders/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }
  
  // NOTA: Los pedidos usualmente no tienen rutas PATCH/DELETE, sino rutas POST para cambiar el ESTADO (status).
}