// src/orders/orders.service.ts (Corregido y Listo)

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'; // ✔️ Importación de excepciones
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service'; 
import { UsersService } from '../users/users.service'; 

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private dataSource: DataSource,
    private productsService: ProductsService,
    private usersService: UsersService,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // ✔️ CORRECCIÓN: Ahora findOneById existe en UsersService y se usa correctamente
      const user = await this.usersService.findOneById(userId); 
      if (!user) {
          throw new BadRequestException('Usuario no encontrado.');
      }
      
      let totalAmount = 0;
      const orderItems: OrderItem[] = [];

      for (const itemDto of createOrderDto.items) {
        // ... Lógica de validación de productos y stock (asume que ProductsService es correcto) ...
        const product = await this.productsService.findOne(itemDto.productId);
        if (product.stock < itemDto.quantity) {
          throw new BadRequestException(`Stock insuficiente para el producto: ${product.name}`);
        }

        const orderItem = queryRunner.manager.create(OrderItem, {
          product: product,
          quantity: itemDto.quantity,
          price: product.price,
        });
        orderItems.push(orderItem);

        product.stock -= itemDto.quantity;
        await queryRunner.manager.save(product);

        totalAmount += product.price * itemDto.quantity;
      }

      const order = queryRunner.manager.create(Order, {
        user: user,
        items: orderItems,
        totalAmount: totalAmount,
        status: 'Pending',
      });

      const savedOrder = await queryRunner.manager.save(order);

      await queryRunner.commitTransaction();
      return savedOrder;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['user', 'items', 'items.product'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({ 
        where: { id },
        relations: ['user', 'items', 'items.product']
    });
    if (!order) {
        throw new NotFoundException(`Pedido con ID ${id} no encontrado.`); 
    }
    return order;
  }
}