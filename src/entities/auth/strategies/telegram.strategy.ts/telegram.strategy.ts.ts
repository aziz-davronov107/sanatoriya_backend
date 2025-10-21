// src/entities/auth/strategies/telegram.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import TelegramStrategyBase from 'passport-telegram-official';

@Injectable()
export class TelegramStrategy extends PassportStrategy(TelegramStrategyBase, 'telegram') {
  constructor() {
    // super()dan OLDIN this'ga teginmang; env'larni lokal o'zgaruvchida o'qing
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const botUsername = process.env.TELEGRAM_BOT_USERNAME; // ixtiyoriy, lekin foydali
    const callbackURL = process.env.TELEGRAM_CALLBACK_URL; // ixtiyoriy

    if (!botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is missing');
    }

    super({
      botToken,
      botUsername,
      callbackURL,
    } as any);
  }

  async validate(profile: any) {
    return {
      telegramId: profile.id,
      firstName: profile.first_name,
      lastName: profile.last_name,
      username: profile.username,
      photoUrl: profile.photo_url,
    };
  }
}
