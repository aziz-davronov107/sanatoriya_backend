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
exports.RefreshJwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const prisma_service_1 = require("../db/prisma.service");
function cookieExtractor(req) {
    return req?.cookies?.['refresh-token'] ?? null;
}
let RefreshJwtStrategy = class RefreshJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'refresh-jwt') {
    prisma;
    constructor(prisma) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                cookieExtractor,
                passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_REFRESH_SECRET,
        });
        this.prisma = prisma;
    }
    async validate(payload) {
        const userId = payload?.sub ?? payload?.id;
        if (!userId)
            throw new common_1.UnauthorizedException('Invalid token payload');
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true },
        });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const profile = await this.prisma.profile.findUnique({
            where: { userId },
        });
        return { ...user, role: profile.role };
    }
};
exports.RefreshJwtStrategy = RefreshJwtStrategy;
exports.RefreshJwtStrategy = RefreshJwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RefreshJwtStrategy);
//# sourceMappingURL=refresh.strategy.js.map