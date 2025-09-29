// src/auth/strategies/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// Define la interfaz para asegurar el tipado del payload
export interface JwtPayload {
    sub: number; // User ID
    email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // 🚨 CORRECCIÓN APLICADA: Usamos '!' para asegurar el tipo string
      secretOrKey: configService.get<string>('JWT_SECRET')!, 
    });
  }

  // Este método se ejecuta si el token es válido
  async validate(payload: JwtPayload) {
    return { 
        id: payload.sub, 
        email: payload.email 
    };
  }
}