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
const swagger_1 = require("@nestjs/swagger");
const publick_decorator_1 = require("../../core/decorators/publick.decorator");
const refresh_guard_1 = require("../../core/guards/refresh_guard");
let AuthControler = class AuthControler {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    me(req) {
        return req.user;
    }
    async register(data, res) {
        let token = await this.authService.register(data);
        let { access_token, refresh_token } = token;
        res.cookie('access-token', access_token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 15 * 60 * 1000,
        });
        res.cookie('refresh-token', refresh_token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
    async login(res, data) {
        let token = await this.authService.login(data);
        let { access_token, refresh_token } = token;
        res.cookie('access-token', access_token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 15 * 60 * 1000,
        });
        res.cookie('refresh-token', refresh_token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return {
            access_token,
            refresh_token,
        };
    }
    async refresh_token(req, res) {
        let token = await this.authService.refresh_token(req.user.id);
        let { access_token } = token;
        res.cookie('access-token', access_token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 15 * 60 * 1000,
        });
        return {
            access_token,
        };
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
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.LoginDto }),
    (0, publick_decorator_1.Public)(),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthControler.prototype, "login", null);
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
exports.AuthControler = AuthControler = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthControler);
//# sourceMappingURL=auth.controler.js.map