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
exports.RoomCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const room_categories_service_1 = require("./room-categories.service");
const publick_decorator_1 = require("../../core/decorators/publick.decorator");
let RoomCategoriesController = class RoomCategoriesController {
    roomCategoriesService;
    constructor(roomCategoriesService) {
        this.roomCategoriesService = roomCategoriesService;
    }
    findAll() {
        return this.roomCategoriesService.findAll();
    }
};
exports.RoomCategoriesController = RoomCategoriesController;
__decorate([
    (0, common_1.Get)(),
    (0, publick_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoomCategoriesController.prototype, "findAll", null);
exports.RoomCategoriesController = RoomCategoriesController = __decorate([
    (0, common_1.Controller)('room-categories'),
    __metadata("design:paramtypes", [room_categories_service_1.RoomCategoriesService])
], RoomCategoriesController);
//# sourceMappingURL=room-categories.controller.js.map