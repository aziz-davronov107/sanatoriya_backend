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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControler = void 0;
const auth_service_1 = require("./auth.service");
const common_1 = require("@nestjs/common");
const auth_dto_1 = require("./dto/auth.dto");
const check_email_dto_1 = require("./dto/check-email.dto");
const check_phone_dto_1 = require("./dto/check-phone.dto");
const swagger_1 = require("@nestjs/swagger");
const publick_decorator_1 = require("../../core/decorators/publick.decorator");
const refresh_guard_1 = require("../../core/guards/refresh_guard");
const passport_1 = require("@nestjs/passport");
let AuthControler = class AuthControler {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    me(req) {
        return req.user;
    }
    async register(data, res) {
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
    async refresh_token(req, res) {
        const token = await this.authService.refresh_token(req.user.id);
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
    async isCheckPhone(data, res) {
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
    async isCheckEmail(data, res) {
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
    async telegramLogin(res) {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        return res.redirect(`${frontendUrl}/auth/telegram`);
    }
    async telegramCallback(req, res) {
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
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        res.redirect(`${frontendUrl}/auth/callback?token=${token.access_token}`);
    }
};
exports.AuthControler = AuthControler;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthControler.prototype, "me", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.CreateDto }),
    (0, publick_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.CreateDto, Object]),
    __metadata("design:returntype", Promise)
], AuthControler.prototype, "register", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.UseGuards)(refresh_guard_1.RefreshTokenGuard),
    (0, publick_decorator_1.Public)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], AuthControler.prototype, "refresh_token", null);
__decorate([
    (0, common_1.Post)('check-phone'),
    (0, publick_decorator_1.Public)(),
    (0, swagger_1.ApiBody)({ type: check_phone_dto_1.CheckPhoneDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_phone_dto_1.CheckPhoneDto, Object]),
    __metadata("design:returntype", Promise)
], AuthControler.prototype, "isCheckPhone", null);
__decorate([
    (0, common_1.Post)('check-email'),
    (0, publick_decorator_1.Public)(),
    (0, swagger_1.ApiBody)({ type: check_email_dto_1.CheckEmailDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_email_dto_1.CheckEmailDto, Object]),
    __metadata("design:returntype", Promise)
], AuthControler.prototype, "isCheckEmail", null);
__decorate([
    (0, common_1.Get)('telegram'),
    (0, publick_decorator_1.Public)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('telegram')),
    (0, swagger_1.ApiOperation)({ summary: 'Initiate Telegram OAuth login' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthControler.prototype, "telegramLogin", null);
__decorate([
    (0, common_1.Get)('telegram/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('telegram')),
    (0, publick_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Telegram OAuth callback' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthControler.prototype, "telegramCallback", null);
exports.AuthControler = AuthControler = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthControler);
//# sourceMappingURL=auth.controler.js.map