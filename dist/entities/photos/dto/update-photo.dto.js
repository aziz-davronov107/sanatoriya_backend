"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePhotoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_photo_dto_1 = require("./create-photo.dto");
class UpdatePhotoDto extends (0, swagger_1.PartialType)(create_photo_dto_1.CreatePhotoDto) {
}
exports.UpdatePhotoDto = UpdatePhotoDto;
//# sourceMappingURL=update-photo.dto.js.map