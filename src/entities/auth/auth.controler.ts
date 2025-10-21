import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { CreateDto } from './dto/auth.dto';
import { CheckEmailDto } from './dto/check-email.dto';
import { CheckPhoneDto } from './dto/check-phone.dto';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators/publick.decorator';
import { RefreshTokenGuard } from 'src/core/guards/refresh_guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthControler {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  me(@Req() req: any) {
    return req.user;
  }

  @Post('register')
  @ApiBody({ type: CreateDto })
  @Public()
  async register(
    @Body() data: CreateDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.register(data);
    const access_token = token?.access_token;
    const refresh_token = token?.refresh_token;

    if (access_token) {
      res.cookie('access-token', access_token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 15 * 60 * 1000,
      });
    }

    if (refresh_token) {
      res.cookie('refresh-token', refresh_token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    return token;
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  @Public()
  async refresh_token(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.refresh_token((req as any).user.id);
    const access_token = token?.access_token;
    if (access_token) {
      res.cookie('access-token', access_token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 15 * 60 * 1000,
      });
    }
    return {
      access_token,
    };
  }
  @Post('check-phone')
  @Public()
  @ApiBody({ type: CheckPhoneDto })
  async isCheckPhone(
    @Body() data: CheckPhoneDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.isCheckPhone(data);

    const access_token = token?.access_token;
    const refresh_token = token?.refresh_token;

    if (access_token) {
      res.cookie('access-token', access_token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 15 * 60 * 1000,
      });
    }

    if (refresh_token) {
      res.cookie('refresh-token', refresh_token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    return token;
  }

  @Post('check-email')
  @Public()
  @ApiBody({ type: CheckEmailDto })
  async isCheckEmail(
    @Body() data: CheckEmailDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.isCheckEmail(data);

    const access_token = token?.access_token;
    const refresh_token = token?.refresh_token;

    if (access_token) {
      res.cookie('access-token', access_token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 15 * 60 * 1000,
      });
    }

    if (refresh_token) {
      res.cookie('refresh-token', refresh_token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    return token;
  }

  @Get('telegram')
  @Public()
  @UseGuards(AuthGuard('telegram'))
  @ApiOperation({ summary: 'Initiate Telegram OAuth login' })
  async telegramLogin(@Res() res: Response) {
    // The passport 'telegram' strategy expects Telegram's callback parameters (auth_date, hash, id)
    // on the request. Calling AuthGuard('telegram') on this initiation route causes the strategy to
    // validate immediately and return 401 because those params are not present.
    // Instead, redirect the user to a frontend page that embeds Telegram's Login Widget or provides
    // a link to start the Telegram authentication. The callback URL should point to /auth/telegram/callback
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return res.redirect(`${frontendUrl}/auth/telegram`);
  }

  @Get('telegram/callback')
  @UseGuards(AuthGuard('telegram'))
  @Public()
  @ApiOperation({ summary: 'Telegram OAuth callback' })
  async telegramCallback(@Req() req: any, @Res() res: Response) {
    const token = await this.authService.loginOrRegisterWithTelegram(req.user);

    const access_token = token?.access_token;
    const refresh_token = token?.refresh_token;

    if (access_token) {
      res.cookie('access-token', access_token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 15 * 60 * 1000,
      });
    }

    if (refresh_token) {
      res.cookie('refresh-token', refresh_token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    // Redirect to frontend with access token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/callback?token=${token.access_token}`);
  }
}
