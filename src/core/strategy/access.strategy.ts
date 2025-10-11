import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../db/prisma.service';
import { Request } from 'express';
import { constants } from 'buffer';

function cookieExtractor(req: Request) {
  return req?.cookies?.['access-token'] ?? null;
}

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(
  Strategy,
  'access-jwt',
) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(), // fallback for tools/tests
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET, // <— don’t hardcode
    });
  }

  async validate(payload: any) {
    const userId = payload?.sub ?? payload?.id; // support both shapes
    if (!userId) throw new UnauthorizedException('Invalid token payload');

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });

    if (!user) throw new UnauthorizedException('User not found');
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });
    return { ...user, role: profile!.role }; // becomes req.user
  }
}
