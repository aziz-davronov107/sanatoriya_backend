import { Controller, Post, Body } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  LimitedVerificationTypes,
  SendOtpDto,
  VerifyOtpDto,
} from './dto/verification.dto';
import { Public } from 'src/core/decorators/publick.decorator';

@ApiTags('Verification')
@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @ApiOperation({
    summary: 'OTP kodini yuborish',
    description: `Yuborish mumkin bo'lgan turlari:
    ${LimitedVerificationTypes.REGISTER},
    ${LimitedVerificationTypes.EMAIL_PASSWORD}`,
  })
  @Post('send')
  @Public()
  async sendOtp(@Body() body: SendOtpDto) {
    return this.verificationService.sendOtp(body);
  }

  @ApiOperation({ summary: 'OTP kodini tekshirish' })
  @Post('verify')
  @Public()
  async verifyOtp(@Body() body: VerifyOtpDto) {
    return this.verificationService.verifyOtp(body);
  }
}
