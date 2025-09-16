import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { VerificationModule } from '../verification/verification.module';

@Module({
    imports: [VerificationModule],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
