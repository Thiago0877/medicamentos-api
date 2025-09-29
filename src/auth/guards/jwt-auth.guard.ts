// src/auth/guards/jwt-auth.guard.ts

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// 'jwt' debe coincidir con el nombre de la estrategia que definiste en jwt.strategy.ts
export class JwtAuthGuard extends AuthGuard('jwt') {}