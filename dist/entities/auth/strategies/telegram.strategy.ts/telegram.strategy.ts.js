"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_telegram_official_1 = require("passport-telegram-official");
let TelegramStrategy = class TelegramStrategy extends (0, passport_1.PassportStrategy)(passport_telegram_official_1.default, 'telegram') {
    constructor() {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const botUsername = process.env.TELEGRAM_BOT_USERNAME;
        const callbackURL = process.env.TELEGRAM_CALLBACK_URL;
        if (!botToken) {
            throw new Error('TELEGRAM_BOT_TOKEN is missing');
        }
        super({
            botToken,
            botUsername,
            callbackURL,
        });
    }
    async validate(profile) {
        return {
            telegramId: profile.id,
            firstName: profile.first_name,
            lastName: profile.last_name,
            username: profile.username,
            photoUrl: profile.photo_url,
        };
    }
};
exports.TelegramStrategy = TelegramStrategy;
exports.TelegramStrategy = TelegramStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TelegramStrategy);
//# sourceMappingURL=telegram.strategy.ts.js.map