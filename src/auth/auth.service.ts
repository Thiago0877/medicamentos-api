// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'; // Asegúrate de tener instalado 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * 1. Valida el usuario y contraseña para el proceso de login.
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      // Retorna el objeto usuario, omitiendo la contraseña para seguridad
      const { password, ...result } = user;
      return result;
    }

    // Si la validación falla, puedes lanzar una excepción o retornar null
    return null;
  }

  /**
   * 2. Genera el token JWT para el usuario validado.
   */
  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id, // 'sub' es un campo estándar de JWT para el ID
      roles: user.roles, // O cualquier dato que necesites en el token
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * 3. Crea un nuevo usuario (opcionalmente).
   */
  async register(createUserDto: any) {
    // Aquí podrías agregar lógica de validación extra si el UsersService no lo hace
    return this.usersService.create(createUserDto);
  }
}
