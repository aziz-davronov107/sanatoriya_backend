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
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const profiles_module_1 = require("./entities/profiles/profiles.module");
const room_categories_module_1 = require("./entities/room-categories/room-categories.module");
const rooms_module_1 = require("./entities/rooms/rooms.module");
const photos_module_1 = require("./entities/photos/photos.module");
const orders_module_1 = require("./entities/orders/orders.module");
const reviews_module_1 = require("./entities/reviews/reviews.module");
const seeder_module_1 = require("./common/seeders/seeder.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_module_1.CoreModule,
            auth_module_1.AuthModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'uploads'),
                serveRoot: '/static',
            }),
            profiles_module_1.ProfilesModule,
            room_categories_module_1.RoomCategoriesModule,
            rooms_module_1.RoomsModule,
            photos_module_1.PhotosModule,
            orders_module_1.OrdersModule,
            reviews_module_1.ReviewsModule,
            seeder_module_1.SeederModule,
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