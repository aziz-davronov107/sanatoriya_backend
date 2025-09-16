import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../db/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { MyRedisModel } from 'src/common/redis/redis.model';
import { AccessJwtStrategy } from '../strategy/access.strategy';
import { RefreshTokenGuard } from '../guards/refresh_guard';
import { RefreshJwtStrategy } from '../strategy/refresh.strategy';
import { AccessTokenGuard } from '../guards/auth-guards';
import { EmailService } from 'src/common/service/mailer.service';
import { SeederModule } from '../../common/seeders/seeder.module';


@Global()
@Module({
  imports: [
    PassportModule,
    PrismaModule,
    JwtModule.register({
      secret: 'yandiev',
      signOptions: { expiresIn: '1h' },
    }),
    MyRedisModel,
    SeederModule,
  ],
  providers: [
    EmailService,
    AccessJwtStrategy,
    AccessTokenGuard,
    RefreshTokenGuard,
    RefreshJwtStrategy,
  ],
  exports: [PassportModule, PrismaModule, JwtModule, EmailService, MyRedisModel],
})
export class CoreModule {}
