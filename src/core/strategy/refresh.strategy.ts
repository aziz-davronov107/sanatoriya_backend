import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../db/prisma.service';
import { Request } from 'express';

function cookieExtractor(req: Request) {
  return req?.cookies?.['refresh-token'] ?? null; // cookie nomi shu bo‘lsin
}

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(), // fallback (Postman/test)
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET, // hardcode emas!
    });
  }

  async validate(payload: any) {
    const userId = payload?.sub ?? payload?.id;
    if (!userId) throw new UnauthorizedException('Invalid token payload');

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, firstname: true, lastname: true, role: true, avatar: true },
    });
    if (!user) throw new UnauthorizedException('User not found');

    return user; // req.user ga tushadi
  }
}
