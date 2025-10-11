"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const prisma_module_1 = require("../db/prisma.module");
const jwt_1 = require("@nestjs/jwt");
const redis_model_1 = require("../../common/redis/redis.model");
const access_strategy_1 = require("../strategy/access.strategy");
const refresh_guard_1 = require("../guards/refresh_guard");
const refresh_strategy_1 = require("../strategy/refresh.strategy");
const auth_guards_1 = require("../guards/auth-guards");
const mailer_service_1 = require("../../common/service/mailer.service");
const seeder_module_1 = require("../../common/seeders/seeder.module");
let CoreModule = class CoreModule {
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            prisma_module_1.PrismaModule,
            jwt_1.JwtModule.register({
                secret: 'yandiev',
                signOptions: { expiresIn: '1h' },
            }),
            redis_model_1.MyRedisModel,
            seeder_module_1.SeederModule,
        ],
        providers: [
            mailer_service_1.EmailService,
            access_strategy_1.AccessJwtStrategy,
            auth_guards_1.AccessTokenGuard,
            refresh_guard_1.RefreshTokenGuard,
            refresh_strategy_1.RefreshJwtStrategy,
        ],
        exports: [
            passport_1.PassportModule,
            prisma_module_1.PrismaModule,
            jwt_1.JwtModule,
            mailer_service_1.EmailService,
            redis_model_1.MyRedisModel,
        ],
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map