import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthControler } from './auth.controler';
import { VerificationModule } from '../verification/verification.module';
import { TelegramStrategy } from './strategies/telegram.strategy.ts/telegram.strategy.ts';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [VerificationModule, PassportModule.register({session:false})],
  controllers: [AuthControler],
  providers: [AuthService, TelegramStrategy],
})
export class AuthModule {}
