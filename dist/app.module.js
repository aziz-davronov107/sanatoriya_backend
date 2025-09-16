"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const core_module_1 = require("./core/core.module/core.module");
const auth_module_1 = require("./entities/auth/auth.module");
const auth_guards_1 = require("./core/guards/auth-guards");
const role_guards_1 = require("./core/guards/role-guards");
const profile_module_1 = require("./entities/profile/profile.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const accommodation_module_1 = require("./entities/accommodation/accommodation.module");
const category_module_1 = require("./entities/category/category.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_module_1.CoreModule,
            auth_module_1.AuthModule,
            profile_module_1.ProfileModule,
            accommodation_module_1.AccommodationModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'uploads'),
                serveRoot: '/static',
            }),
            category_module_1.CategoryModule
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guards_1.AccessTokenGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: role_guards_1.RolesGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map