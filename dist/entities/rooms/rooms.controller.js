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
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
const rooms_service_1 = require("./rooms.service");
const create_room_dto_1 = require("./dto/create-room.dto");
const update_room_dto_1 = require("./dto/update-room.dto");
const swagger_1 = require("@nestjs/swagger");
const query_dto_1 = require("./dto/query-dto");
const role_decorator_1 = require("../../core/decorators/role.decorator");
const client_1 = require("@prisma/client");
const publick_decorator_1 = require("../../core/decorators/publick.decorator");
let RoomsController = class RoomsController {
    roomsService;
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    create(createRoomDto) {
        return this.roomsService.create(createRoomDto);
    }
    async findMany(data) {
        return this.roomsService.findMany(data);
    }
    findOne(id) {
        return this.roomsService.findOne(id);
    }
    update(id, updateRoomDto) {
        return this.roomsService.update(id, updateRoomDto);
    }
    remove(id) {
        return this.roomsService.remove(id);
    }
};
exports.RoomsController = RoomsController;
__decorate([
    (0, role_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.USER),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new room' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Room created' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid payload' }),
    (0, swagger_1.ApiBody)({ type: create_room_dto_1.CreateRoomDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('get_all'),
    (0, publick_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get list of rooms with filters, pagination and sorting',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_dto_1.GetRoomsQueryDto]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "findMany", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, publick_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get room by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiOkResponse)({ description: 'Room details' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update room by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiBody)({ type: update_room_dto_1.UpdateRoomDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_room_dto_1.UpdateRoomDto]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "update", null);
__decorate([
    (0, role_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete room by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Room deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "remove", null);
exports.RoomsController = RoomsController = __decorate([
    (0, swagger_1.ApiTags)('rooms'),
    (0, common_1.Controller)('rooms'),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsController);
//# sourceMappingURL=rooms.controller.js.map